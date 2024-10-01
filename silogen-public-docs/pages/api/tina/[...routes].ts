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
  const cookies = cookie.parse(req.headers.cookie || "");
  logger.debug({ cookies }, "Received cookies");
  const token =
    cookies["next-auth.session-token"] ||
    cookies["__Secure-next-auth.session-token"];
  logger.debug({ token }, "Extracted token from cookie");
  const userId = token ? await analyzeToken(token) : "unknown";
  setCurrentUserId(userId); // Update the global user ID
  logger.debug({ userId }, "Request received from user");
  logger.debug({ method: req.method, url: req.url }, "Request details");
  return handler(req, res);
};
export default tinaHandler;
