// const express = require("express");
// require("express-async-errors");
// const app = express();
// const connectDatabase = require("./db/Database");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
const app = express();
import { connectDatabase } from "./db/Database.js";
import "express-async-errors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.js";

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server for handling uncaught exception");
});

app.use("/api/v2/user", userRoutes);

connectDatabase();

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
