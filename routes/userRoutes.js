import express from "express";
import {
  createUser,
  getAllAdmins,
  getAllStudents,
  getAllTeachers,
  getAllUsers,
} from "../controllers/userController.js";
import { isAdmin, isTeacher } from "../middleware/Middleware.js";

const router = express.Router();

// Route to create a new user (Admin/Teacher/Student)
// This will create a user with the specified role (Admin, Teacher, or Student)
router.post("/users/create", createUser);

// Route to get all users (accessible by Admin only)
// Only admins can view the list of all users
router.get("/users/get", isAdmin, getAllUsers);

// Route to get all Admins
// Fetches a list of all users with the "Admin" role
router.get("/admins/get", isAdmin, getAllAdmins);

// Route to get all Teachers
// Fetches a list of all users with the "Teacher" role
router.get("/teachers/get", isAdmin, getAllTeachers);

// Route to get all Students
// Fetches a list of all users with the "Student" role
router.get("/students/get", isAdmin, isTeacher, getAllStudents);

export default router;
