// src/App.js
import React from 'react';
import SubmissionTable from './components/Submission';
import './App.css';  // Make sure you have the correct path to your CSS file

function App() {
  return (
    <div className="App">
      <h1>Interview Experience Table</h1>
      <SubmissionTable />
    </div>
  );
}

export default App;
