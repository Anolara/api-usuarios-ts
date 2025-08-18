import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Rota: GET /users/:id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id); // pega o id da URL
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;
