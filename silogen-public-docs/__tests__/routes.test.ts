import { NextApiRequest, NextApiResponse } from "next";
import { decode } from "next-auth/jwt";
import tinaHandler, { logger } from "../pages/api/tina/[...routes]";
import cookie from "cookie";

import { vi, beforeAll, describe, beforeEach, it, expect } from "vitest";

vi.mock("next-auth/jwt");
vi.mock("pino", () => {
  return {
    default: vi.fn(() => ({
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    })),
  };
});

vi.mock("cookie");

vi.mock("@tinacms/datalayer", () => ({
  TinaNodeBackend: vi.fn(() => (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: "Mocked TinaNodeBackend response" });
  }),
  createDatabase: vi.fn(),
  createLocalDatabase: vi.fn(),
}));

vi.mock("../tina/database", () => ({
  __esModule: true,
  default: {
    // Add any necessary mock properties or methods here
  },
  setCurrentUserId: vi.fn(),
}));

beforeAll(() => {
  process.env.NEXTAUTH_SECRET = "your-secret-key";
});

describe("tinaHandler", () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;

  beforeEach(() => {
    mockReq = {
      headers: { cookie: "" },
      method: "GET",
      url: "/api/tina/test",
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.clearAllMocks();
  });

  it("should log user ID at debug level", async () => {
    const mockToken = "mock-token";
    const mockUserId = "mock-user-id";
    (cookie.parse as vi.Mock).mockReturnValue({
      "next-auth.session-token": mockToken,
    });
    (decode as vi.Mock).mockResolvedValue({ sub: mockUserId });

    await tinaHandler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(logger.debug).toHaveBeenCalledWith(
      { userId: mockUserId },
      "Request received from user",
    );
  });

  it('should log "unknown" user ID when no token is present', async () => {
    (cookie.parse as vi.Mock).mockReturnValue({});

    await tinaHandler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(logger.debug).toHaveBeenCalledWith(
      { userId: "unknown" },
      "Request received from user",
    );
  });

  it("should log debug information about the request", async () => {
    (cookie.parse as vi.Mock).mockReturnValue({});
    await tinaHandler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(logger.debug).toHaveBeenCalledWith(
      { method: "GET", url: "/api/tina/test" },
      "Request details",
    );
  });

  it("should handle token analysis errors", async () => {
    const mockToken = "invalid-token";
    (cookie.parse as vi.Mock).mockReturnValue({
      "next-auth.session-token": mockToken,
    });
    (decode as vi.Mock).mockRejectedValue(new Error("Token analysis failed"));

    await tinaHandler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(logger.error).toHaveBeenCalledWith("Token analysis failed");
    expect(logger.debug).toHaveBeenCalledWith(
      { userId: "unknown" },
      "Request received from user",
    );
  });
});
