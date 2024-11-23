import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dbConnect from "../config/database.js";
import router from "../routes/userRoutes.js";

const app = express();

dotenv.config();
// const PORT = 3000;
const PORT = 3000 || process.env.PORT;
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server Running Successfully",
  });
});

dbConnect();

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
