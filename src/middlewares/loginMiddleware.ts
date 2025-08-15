import type { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import dotenv from "dotenv";

dotenv.config();

// Garante que o secret existe e é string
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not defined in .env");

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token missing" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Invalid Authorization header format" });
  }

  const token = parts[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET),
    );
    (req as any).user = payload;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
