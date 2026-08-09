import express from "express";
import cors from "cors";
// import helmet from "helmet";
// import compression from "compression";
// import morgan from "morgan";
import projectRoutes from "./controller/projects.js";
import technologyRouter from "./controller/technology.js";

const app = express();

// app.use(helmet());
app.use(
  cors({
    origin: [
      "https://ismartin.com",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);
// app.use(compression());
// app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

// Rutas
app.use("/api/projects", projectRoutes);
app.use("/api/techs", technologyRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default app;
