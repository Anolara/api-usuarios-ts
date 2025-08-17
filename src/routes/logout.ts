import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  // Remove o cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true se estiver em HTTPS
    sameSite: "strict",
  });

  res.json({ message: "Logout successful" });
});

export default router;
