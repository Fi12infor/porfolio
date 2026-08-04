import { Router } from "express";
import prisma from "../config/prisma.js";
import { requireAdmin } from "../middleware.js";

const projectRouter = Router();

projectRouter.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        published: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "No se pudieron obtener los proyectos.",
    });
  }
});

projectRouter.post("/", requireAdmin, async (req, res) => {
  const {
    title,
    slug,
    shortDescription,
    description,
    imageUrl,
    demoUrl,
    repositoryUrl,
    featured = false,
    published = true,
    displayOrder = 0,
    technologySlugs = [],
  } = req.body;

  if (
    !title ||
    !slug ||
    !shortDescription ||
    !description ||
    !Array.isArray(technologySlugs)
  ) {
    return res.status(400).json({
      error: "Los datos enviados no son válidos.",
    });
  }

  try {
    const technologies = await prisma.technology.findMany({
      where: {
        slug: {
          in: technologySlugs,
        },
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (technologies.length !== technologySlugs.length) {
      const foundSlugs = technologies.map((technology) => technology.slug);

      const missingSlugs = technologySlugs.filter(
        (technologySlug) => !foundSlugs.includes(technologySlug),
      );

      return res.status(400).json({
        error: "Hay tecnologías que no existen.",
        missingTechnologies: missingSlugs,
      });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        slug,
        shortDescription,
        description,
        imageUrl,
        demoUrl,
        repositoryUrl,
        featured,
        published,
        displayOrder,

        technologies: {
          create: technologies.map((technology) => ({
            technologyId: technology.id,
          })),
        },
      },

      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "No se pudo añadir el proyecto.",
    });
  }
});

projectRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "El id debe ser un número entero.",
    });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(400).json({
        error: "Proyecto no encontrado.",
      });
    }

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se pudo obtener el proyecto.",
    });
  }
});

projectRouter.patch("/:id", requireAdmin, async (req, res) => {
  const {
    title,
    slug,
    shortDescription,
    description,
    imageUrl,
    demoUrl,
    repositoryUrl,
    featured,
    published,
    displayOrder,
    technologySlugs,
  } = req.body;

  const id = Number(req.params.id);

  if (technologySlugs !== undefined && !Array.isArray(technologySlugs)) {
    return res.status(400).json({
      error: "technologySlugs debe ser un array.",
    });
  }

  if (!Number.isInteger(id) || !id || id <= 0) {
    return res.status(400).json({
      error: "El id debe ser un número entero.",
    });
  }

  try {
    let technologies;

    if (technologySlugs !== undefined) {
      const uniqueSlugs = [
        ...new Set(
          technologySlugs.map((technologySlug) =>
            technologySlug.trim().toLowerCase(),
          ),
        ),
      ];

      technologies = await prisma.technology.findMany({
        where: {
          slug: {
            in: uniqueSlugs,
          },
        },
        select: {
          id: true,
          slug: true,
        },
      });

      if (technologies.length !== uniqueSlugs.length) {
        const foundSlugs = technologies.map((technology) => technology.slug);

        const missingSlugs = uniqueSlugs.filter(
          (technologySlug) => !foundSlugs.includes(technologySlug),
        );

        return res.status(400).json({
          error: "Hay tecnologías que no existen.",
          missingTechnologies: missingSlugs,
        });
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        shortDescription,
        description,
        imageUrl,
        demoUrl,
        repositoryUrl,
        featured,
        published,
        displayOrder,
        ...(technologies && {
          technologies: {
            deleteMany: {},
            create: technologies.map((technology) => ({
              technologyId: technology.id,
            })),
          },
        }),
      },

      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "No se pudo actualizar el proyecto.",
    });
  }
});

export default projectRouter;
