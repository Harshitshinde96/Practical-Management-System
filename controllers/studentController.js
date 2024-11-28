import SubjectModel from "../models/Subject.js";

// Create a new subject
export const createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;

    // Ensure required fields are provided
    if (!name || !code) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, code" });
    }

    // Create new subject with the provided data and the user ID from the request
    const subject = new SubjectModel({
      name,
      code,
      createdBy: req.user.id, // Set createdBy as the current user's ID
    });

    // Save the new subject to the database
    const savedSubject = await subject.save();

    // Return the created subject with a success message
    res.status(201).json({
      savedSubject,
      message: "Subject created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create subject",
      details: error.message, // Provide details about the error
    });
  }
};

// Get all subjects (admin sees full details, others see only subject list)
export const getSubjects = async (req, res) => {
  try {
    let subjects;

    // If the user is an admin, populate the 'createdBy' field with detailed user info
    if (req.user.role === "Admin") {
      subjects = await SubjectModel.find()
        .populate("createdBy", "name email role") // Populate 'createdBy' field with specific fields
        .lean(); // Return plain JavaScript object (no Mongoose-specific methods)
    } else {
      // For Teachers and Students, exclude 'createdBy' field from the response
      subjects = await SubjectModel.find().select("-createdBy");
    }

    // Return the list of subjects with a success message
    res.status(200).json({
      message: "Subjects retrieved successfully.",
      subjects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching subjects.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
