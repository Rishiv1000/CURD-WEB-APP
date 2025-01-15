// models/Submission.js
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  company: { type: String, required: true },
  questions: { type: [String], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
