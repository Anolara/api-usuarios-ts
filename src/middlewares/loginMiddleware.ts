import type { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not defined in .env");

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Pega o token do cookie
  const token = req.cookies.token;

  if (!token) return res.redirect("/token-missing.html");

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    (req as any).user = payload;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
