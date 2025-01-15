import React, { useState, useEffect, useCallback } from 'react';
import './Submission.css';
import axios from 'axios';

const SubmissionTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [newSubmission, setNewSubmission] = useState({
    name: '',
    country: '',
    company: '',
    questions: ['', '', ''], // Pre-fill with empty questions
  });
  const [editMode, setEditMode] = useState(false);
  const [editSubmissionId, setEditSubmissionId] = useState(null);

  // const apiUrl = process.env.REACT_APP_API_URL;

  const apiUrl = "https://curd-web-app-86qt.onrender.com/api"

  const getSubmissions = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    getSubmissions(); // Call the function to fetch data on component mount
  }, [getSubmissions]);

  const createSubmission = async () => {
    try {
      const response = await axios.post(`${apiUrl}`, newSubmission);
      setSubmissions([...submissions, response.data]);
      setNewSubmission({ name: '', country: '', company: '', questions: ['', '', ''] });
    } catch (error) {
      console.error('Error creating submission:', error.response?.data || error.message);
    }
  };

  const updateSubmission = async () => {
    try {
      const response = await axios.put(`${apiUrl}/${editSubmissionId}`, newSubmission);
      setSubmissions(submissions.map(submission =>
        submission._id === editSubmissionId ? response.data : submission
      ));
      resetForm();
    } catch (error) {
      console.error('Error updating submission:', error.response?.data || error.message);
    }
  };

  const deleteSubmission = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setSubmissions(submissions.filter(submission => submission._id !== id));
    } catch (error) {
      console.error('Error deleting submission:', error.response?.data || error.message);
    }
  };

  const handleEdit = (submission) => {
    setEditMode(true);
    setEditSubmissionId(submission._id);
    setNewSubmission({
      name: submission.name,
      country: submission.country,
      company: submission.company,
      questions: submission.questions,
    });
  };

  const resetForm = () => {
    setEditMode(false);
    setEditSubmissionId(null);
    setNewSubmission({ name: '', country: '', company: '', questions: ['', '', ''] });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...newSubmission.questions];
    updatedQuestions[index] = value;
    setNewSubmission({ ...newSubmission, questions: updatedQuestions });
  };

  return (
    <div className="submission-container">
      <header className="header">
        <h2>StudentHQ Submissions</h2>
      </header>

      {/* Table Display */}
      <div className="table-container">
        <table className="submission-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Company</th>
              <th>Questions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.name}</td>
                <td>{submission.country}</td>
                <td>{submission.company}</td>
                <td>{submission.questions.join(', ')}</td>
                <td className="action-buttons">
                  <button className="update" onClick={() => handleEdit(submission)}>Edit</button>
                  <button className="delete" onClick={() => deleteSubmission(submission._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Update Form */}
      <div className="form-card">
        <h3>{editMode ? 'Update Submission' : 'Create New Submission'}</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={newSubmission.name}
          onChange={(e) => setNewSubmission({ ...newSubmission, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={newSubmission.country}
          onChange={(e) => setNewSubmission({ ...newSubmission, country: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          value={newSubmission.company}
          onChange={(e) => setNewSubmission({ ...newSubmission, company: e.target.value })}
        />

        {/* Questions Inputs */}
        <div className="questions-section">
          {newSubmission.questions.map((question, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Question ${index + 1}`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
          ))}
        </div>

        <button className="submit-btn" onClick={editMode ? updateSubmission : createSubmission}>
          {editMode ? 'Update Submission' : 'Submit'}
        </button>
        {editMode && (
          <button className="cancel-btn" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default SubmissionTable;
