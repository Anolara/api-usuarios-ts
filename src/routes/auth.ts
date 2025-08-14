import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = Router();

router.post("/login", async (req, res) => {
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

    // Aqui você poderia gerar um token JWT, se quiser
    res.json({ message: "Login successful", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
