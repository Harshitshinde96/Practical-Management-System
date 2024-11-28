import userModel from "../models/User.js";

// Create a new user (Admin, Teacher, or Student)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate that the role is valid
    const validRoles = ["Admin", "Teacher", "Student"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" }); // 400 Bad Request if role is invalid
    }

    // Create a new user instance with the provided data
    const user = new userModel({
      name,
      email,
      password,
      role,
    });

    // Save the user to the database
    const savedUser = await user.save();
    res.status(201).json({
      // 201 Created: Respond with a success message and saved user data
      message: `${role} created successfully`,
      savedUser,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      // 500 Internal Server Error if there's a problem saving the user
      error: "Failed to create user",
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await userModel.find().lean();
    res.status(200).json({ users }); // 200 OK: Return list of all users
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching users. Please try again later.",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Get all Admins
export const getAllAdmins = async (req, res) => {
  try {
    // Fetch all users with the 'Admin' role
    const admins = await userModel.find({ role: "Admin" }).lean();
    res.status(200).json({ admins }); // 200 OK: Return list of all admins
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching admins.",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Get all Teachers
export const getAllTeachers = async (req, res) => {
  try {
    // Fetch all users with the 'Teacher' role
    const teachers = await userModel.find({ role: "Teacher" }).lean();
    res.status(200).json({ teachers }); // 200 OK: Return list of all teachers
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching teachers.",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Get all Students
export const getAllStudents = async (req, res) => {
  try {
    // Fetch all users with the 'Student' role
    const students = await userModel.find({ role: "Student" }).lean();
    res.status(200).json({ students }); // 200 OK: Return list of all students
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching students.",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
