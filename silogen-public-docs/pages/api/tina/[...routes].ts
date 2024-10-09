import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";

import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from "tinacms-authjs";
import { NextApiRequest, NextApiResponse } from "next";
import { decode } from "next-auth/jwt";
import cookie from "cookie";
import pino from "pino";
import pretty from "pino-pretty";
import databaseClient from "../../../tina/__generated__/databaseClient";
import { setCurrentUserId } from "../../../tina/database";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  pretty({
    colorize: true,
  }),
);

export const analyzeToken = async (token: string): Promise<string> => {
  logger.debug("Analyzing token");

  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      logger.error("NEXTAUTH_SECRET is not set");
      return "unknown";
    }

    const decoded = await decode({ token, secret });
    logger.debug("Token decoded successfully");

    if (decoded && typeof decoded === "object" && "sub" in decoded) {
      return decoded.sub as string;
    } else {
      logger.warn("Decoded token does not contain a sub property");
      return "unknown";
    }
  } catch (error) {
    logger.error("Token analysis failed");
    if (error instanceof Error) {
      logger.debug(
        { message: error.message, stack: error.stack },
        "Error details",
      );
    }
    return "unknown";
  }
};

const tinaHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  let userId = "unknown";

  // Check if this is a login attempt
  if (
    req.url === "/api/tina/auth/callback/credentials" &&
    req.method === "POST"
  ) {
    logger.debug("Handling login attempt");
    // For login attempts, we'll let the handler deal with authentication
  } else {
    // For all other requests, try to get the user from the session token
    const cookies = cookie.parse(req.headers.cookie || "");
    logger.debug({ cookies }, "Received cookies");

    const token =
      cookies["__Secure-next-auth.session-token"] ||
      cookies["next-auth.session-token"];

    if (token) {
      logger.debug({ token }, "Extracted token from cookie");
      userId = await analyzeToken(token);
    } else {
      logger.debug("No session token found in cookies");
    }
  }

  setCurrentUserId(userId); // Update the global user ID
  logger.debug({ userId }, "Request received from user");
  logger.debug({ method: req.method, url: req.url }, "Request details");
  return handler(req, res);
};
export default tinaHandler;
