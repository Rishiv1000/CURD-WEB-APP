const Submission = require('../models/Submission');

// Create a new submission
const createSubmission = async (req, res) => {
  const { name, country, company, questions } = req.body;

  // Ensure questions is an array of strings, if provided as a string, convert it
  const formattedQuestions = Array.isArray(questions) ? questions : questions.split(',').map(q => q.trim());

  // Validate required fields
  if (!name || !country || !company || !formattedQuestions.length) {
    return res.status(400).json({
      message: 'All fields are required and questions must be a non-empty array of strings.',
    });
  }

  try {
    const newSubmission = new Submission({
      name,
      country,
      company,
      questions: formattedQuestions,
    });

    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Get all submissions
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Update a submission
const updateSubmission = async (req, res) => {
  const { name, country, company, questions } = req.body;

  // If questions are provided, format them as an array of strings
  const formattedQuestions = questions ? (Array.isArray(questions) ? questions : questions.split(',').map(q => q.trim())) : undefined;

  try {
    // Find the submission by ID and update it
    const updatedSubmission = await Submission.findByIdAndUpdate(
      req.params.id,
      { name, country, company, questions: formattedQuestions },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json(updatedSubmission);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a submission
const deleteSubmission = async (req, res) => {
  try {
    const deletedSubmission = await Submission.findByIdAndDelete(req.params.id);

    if (!deletedSubmission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json({ message: 'Submission deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSubmission,
  getAllSubmissions,
  updateSubmission,
  deleteSubmission,
};
