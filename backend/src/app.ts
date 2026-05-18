import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import { errorHandler } from "./middleware/error.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Smart Leads Dashboard API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorHandler);

export default app;