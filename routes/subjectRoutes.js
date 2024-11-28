import express from 'express';
import { createSubject, getSubjects } from '../controllers/studentController.js';

const router = express.Router();

// Route to create a new subject
// This will be used by admins to create subjects
router.post('/subject/create', createSubject);

// Route to get all subjects
// This will fetch the list of subjects available
router.get('/subjects/get', getSubjects);

export default router;