import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import dbConnect from "./config/database";






const app = express();
const PORT = 3000;
// const PORT = 3000 || process.env.PORT;










app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
