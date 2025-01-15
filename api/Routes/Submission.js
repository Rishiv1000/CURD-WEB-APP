const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createSubmission,
  getAllSubmissions,
  updateSubmission,
  deleteSubmission
} = require('../Controller/SubmissionController');

// Create a new submission
router.post('/', createSubmission);

// Get all submissions
router.get('/', getAllSubmissions);

// Update a submission
router.put('/:id', updateSubmission);

// Delete a submission
router.delete('/:id', deleteSubmission);

module.exports = router;
