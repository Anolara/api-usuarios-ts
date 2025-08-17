import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const router = Router();

// Se ainda não tiver, use cookieParser no seu app principal
// app.use(cookieParser());

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Cria o token JWT
    const token = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(process.env.JWT_EXPIRES_IN || "1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

    // Envia o token como cookie HTTP-only
    res
      .cookie("token", token, {
        httpOnly: true, // não acessível via JS
        secure: false, // true se estiver em HTTPS
        sameSite: "strict",
        maxAge: 3600000, // 1 hora
      })
      .json({
        message: "Login successful",
        user: { id: user.id, email: user.email },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;
