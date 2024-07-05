import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// import routes
import userRoutes from "./routes/user.js";

app.use("/api/v2/user", userRoutes);

app.use(errorHandler);

export default app;
