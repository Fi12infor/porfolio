import { Router } from "express";
import { createPrisma } from "../config/prisma.js";
import { requireAdmin } from "../middleware/middleware.js";

const technologyRouter = Router();

technologyRouter.get("/", async (req, res) => {
  const prisma = createPrisma();
  try {
    const technologies = await prisma.technology.findMany();

    res.status(200).json(technologies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "No se pudieron obtener las tecnologias.",
    });
  }
});

technologyRouter.post("/", requireAdmin, async (req, res) => {
  const prisma = createPrisma();
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({
      error: "name y slug son obligatorios.",
    });
  }

  try {
    const newTechnology = await prisma.Technology.create({
      data: {
        name,
        slug,
      },
    });

    res.status(201).json(newTechnology);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "No se pudo crear la tecnología.",
    });
  }
});

export default technologyRouter;
