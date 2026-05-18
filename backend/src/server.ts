import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    console.log("Starting Smart Leads API...");
    console.log("PORT:", PORT);
    console.log("Mongo URI exists:", Boolean(process.env.MONGO_URI));

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();