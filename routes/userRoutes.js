import express from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";


const router = express.Router();

router.post("/users/create", createUser);
router.get("/users/get", getAllUsers);

export default router;
