import express from "express";
import {
  createUser,
  getAllAdmins,
  getAllStudents,
  getAllTeachers,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();


// Route to create a new user (Admin/Teacher/Student)
// This will create a user with the specified role (Admin, Teacher, or Student)
router.post("/users/create", createUser);

// Route to get all users (accessible by Admin only)
// Only admins can view the list of all users
router.get("/users/get", getAllUsers);

// Route to get all Admins
// Fetches a list of all users with the "Admin" role
router.get("/admins/get", getAllAdmins);

// Route to get all Teachers
// Fetches a list of all users with the "Teacher" role
router.get("/teachers/get", getAllTeachers);

// Route to get all Students
// Fetches a list of all users with the "Student" role
router.get("/students/get", getAllStudents);


export default router;



// import express from 'express';
// import userRoutes from './routes/userRoutes.js';
// import subjectRoutes from './routes/subjectRoutes.js';
// import practicalRoutes from './routes/practicalRoutes.js';

// const app = express();

// app.use(express.json());

// // Base path setup
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/subjects', subjectRoutes);
// app.use('/api/v1/practicals', practicalRoutes);

// export default app;
