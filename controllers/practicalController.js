import Practical from "../models/Practical.js";
import SubjectModel from "../models/Subject.js";

export const createPractical = async (req, res) => {
  try {
    const { subjectId, title, description } = req.body;

    if (!subjectId || !title || !description) {
      return res.status(400).json({
        error: "Missing required fields: subjectId, title, description",
      });
    }

    const subject = await SubjectModel.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found." });
    }

    const practical = new Practical({
      subjectId,
      title,
      description,
      createdBy,
    });

    const savedPractical = await practical.save();

    res.status(201).json({
      message: "Practical created successfully.",
      savedPractical,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Failed to create Practical ${error}`,
      details: error.message,
    });
  }
};

// “/practicals/get”: Get all practicals (view enrolled students as well)

export const getPracticals = async (req, res) => {
  try {
    const practicals = await Practical.find()

      .populate("subjectId", "name code") // To include subject details
      .populate("createdBy", "name email role") // To include creator details
      .populate("enrolledStudents", "name email")
      .lean();

    res.status(200).json({
      message: "Practicals retrieved successfully.",
      practicals,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch practicals",
      details: error.message,
    });
  }
};

// “/practicals/enroll”: Students can enroll in practicals
export const enrollInPractical = async (req, res) => {
  try {
    const { practicalId, studentId } = req.body; // Pass studentId in the request body

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required." });
    }

    const practical = await Practical.findById(practicalId);
    if (!practical) {
      return res.status(404).json({ message: "Practical not found." });
    }

    // Prevent duplicate enrollment
    if (practical.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: "Already enrolled." });
    }

    practical.enrolledStudents.push(studentId);
    await practical.save();

    res.status(200).json({ message: "Enrolled successfully.", practical });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error enrolling in practical.",
        details: error.message,
      });
  }
};
