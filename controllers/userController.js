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
    const getUsers = await userModel.find();
    res.status(200).json({ getUsers });
  } catch (error) {
    res.status(500).json({
      error: "Cannot fetch data",
    });
    console.error(error);
  }
};
