import express from "express";
import { createPractical, enrollInPractical, getPracticals } from "../controllers/practicalController.js";
import { isTeacher } from "../middleware/Middleware.js";


const router = express.Router();


router.post("/practicals/create", isTeacher,createPractical);

router.get("/practicals/get", getPracticals);

router.post("/practicals/enroll", enrollInPractical); 

export default router;
