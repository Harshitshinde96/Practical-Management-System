import userModel from "../models/User.js";



export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate role
    const validRoles = ["Admin", "Teacher", "Student"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" }); // 400 Bad Request
    }

    // Create a new user instance
    const user = new userModel({
      name,
      email,
      password,
      role,
    });

    // Save the user to the database
    const savedUser = await user.save();
    res.status(201).json({
      // 201 Created
      message: `${role} created successfully`,
      savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      // 500 Internal Server Error
      error: "Failed to create user",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().lean();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching users. Please try again later.",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await userModel.find({ role: "Admin" }).lean();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching admins.",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await userModel.find({ role: "Teacher" }).lean();
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching teachers.",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await userModel.find({ role: "Student" }).lean();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching students.",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
