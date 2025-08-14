import type { User } from "../models/User";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const listaUsuarios: User[] = []
const router = Router();

router.post("/", async (req, res) => {
  // Handle user creation logic here
  const { name, email, password } = req.body as User;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required." });
  }
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already exists." });
    }
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;