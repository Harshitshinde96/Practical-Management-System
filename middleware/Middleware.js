
import userModel from "../models/User.js";
import express from "express";

const app = express();

app.use(express.json());

export const isAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const userInfo = await userModel.findOne({ email }).select("role");

    if (userInfo && userInfo.role === "Admin") {
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: "Unauthorized access !!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const isTeacher = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const userInfo = await userModel.findOne({ email }).select("role");

    if (userInfo && userInfo.role === "Teacher") {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized access !!!!!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message} `});
  }
};