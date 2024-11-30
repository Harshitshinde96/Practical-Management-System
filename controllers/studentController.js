// import SubjectModel from "../models/Subject.js";
import Subject from "../models/Subject.js";

// Create a new subject
export const createSubject = async (req, res) => {
  try {
    const { name, code, createdBy } = req.body;

    // Ensure required fields are provided
    if (!name || !code) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, code" });
    }

    // Check for existing subject code
    const existingSubject = await Subject.findOne({ code }).lean();
    if (existingSubject) {
      return res.status(400).json({ message: "Subject code already exists." });
    }

    // Create new subject with the provided data and the user ID from the request
    const subject = new Subject({
      name,
      code,
      createdBy,
    });

    // Save the new subject to the database
    const savedSubject = await subject.save();

    // Return the created subject with a success message
    res.status(201).json({
      message: "Subject created successfully",
      savedSubject,
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Failed to create subject ${error}`,
      details: error.message, // Pro  vide details about the error
    });
  }
};

// Get all subjects 
export const getSubjects = async (req, res) => {
  try {
    // Fetch all subjects from the database
    const subjects = await Subject.find().lean();    // Use Subject or SubjectModel but you have to import 1st

    // Return the list of subjects with a success message
    res.status(200).json({
      message: "Subjects retrieved successfully.",
      subjects,  // Use 'subjects' for clarity
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching subjects.",
      error: process.env.NODE_ENV === "development"
        ? error.message  // Provide detailed error in development
        : "Internal server error",  // General message in production
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
