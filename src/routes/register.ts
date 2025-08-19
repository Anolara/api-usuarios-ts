import type { User } from "../models/User";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body as User;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email and password are required." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    if (prismaError.code === "P2002") {
      return res.status(400).json({ error: "Email already exists." });
    }
    res.status(500).json({ error: "Something went wrong." });
  }
});

//listar usuários
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
