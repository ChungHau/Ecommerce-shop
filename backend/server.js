import express from "express";
const app = express();
import "express-async-errors";
import "dotenv/config";
import { connectDatabase } from "./db/Database.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log("shutting down the server for handling uncaught exception");
// });

connectDatabase();

app.use("/user", userRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
