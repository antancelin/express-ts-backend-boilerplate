import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "API is healthy! 💚",
  });
});

export default router;
