import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dbConnect from "../config/database.js";

//Routes Imported
import userRoutes from "../routes/userRoutes.js";
import subjectRoutes from "../routes/subjectRoutes.js";
// import practicalRoutes from '../routes/practicalRoutes.js'

dotenv.config();
const app = express();

// const PORT = 3000;
const PORT = 3000 || process.env.PORT;
app.use(express.json());

// app.use("/api/v1", router);
// Route grouping
app.use('/api/v1', userRoutes);
app.use('/api/v1', subjectRoutes);
// app.use('/api/v1', practicalRoutes);


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
