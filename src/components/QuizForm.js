import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
 

const QuizForm = ({ setQuizData }) => {
  const [formData, setFormData] = useState({
    quiz_for: '',
    subject: '',
    schooling_level: '',
    numQuestions: 5,
    level: 'Medium',
    language: 'English'
  });
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [schoolingLevels, setSchoolingLevels] = useState([]);

  const subjectOptions = useMemo(() => ({
    student: [
      { value: 'math', label: 'Mathematics' },
      { value: 'science', label: 'Science' },
      { value: 'biology', label: 'Biology' },
      { value: 'history', label: 'History' }
    ],
    professional: [
      { value: 'Finance_and_Accounting', label: 'Finance and Accounting' },
      { value: 'Engineering', label: 'Engineering' },
      { value: 'Healthcare_and_Medicine', label: 'Healthcare and Medicine' }
    ],
    programming: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: '.NET', label: '.NET' },
      { value: 'SQL', label: 'SQL' },
      { value: 'Database', label: 'Database' }
    ],
    datascience: [
      { value: 'machinelearning', label: 'Machine Learning' },
      { value: 'statistics', label: 'Statistics' },
      { value: 'bigdata', label: 'Big Data' }
    ]
  }), []);

  const schoolingLevelOptions = useMemo(() => [
    { value: 'elementary', label: 'Elementary School' },
    { value: 'middle', label: 'Middle School' },
    { value: 'high', label: 'High School' }
  ], []);

  useEffect(() => {
    if (formData.quiz_for === 'student') {
      setSchoolingLevels(schoolingLevelOptions);
    } else {
      setSchoolingLevels([]);
    }
    setSubjects(subjectOptions[formData.quiz_for] || []);
  }, [formData.quiz_for, schoolingLevelOptions, subjectOptions]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/generate_quiz', formData);
      console.log('Quiz Data:', response.data);
      setQuizData(response.data);
    } catch (error) {
      console.error('Error generating quiz:', error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="quiz_for" className="form-label">Quiz For</label>
        <select className="form-select" id="quiz_for" name="quiz_for" value={formData.quiz_for} onChange={handleChange} required>
          <option value="">Select target audience...</option>
          <option value="student">Student</option>
          <option value="professional">Professional</option>
          <option value="programming">Programming Community</option>
          <option value="datascience">Data Science Community</option>
        </select>
      </div>
      {subjects.length > 0 && (
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <select className="form-select" id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
            <option value="">Select subject...</option>
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>{subject.label}</option>
            ))}
          </select>
        </div>
      )}
      {schoolingLevels.length > 0 && (
        <div className="mb-3">
          <label htmlFor="schooling_level" className="form-label">Schooling Level</label>
          <select className="form-select" id="schooling_level" name="schooling_level" value={formData.schooling_level} onChange={handleChange}>
            <option value="">Select schooling level...</option>
            {schoolingLevels.map((level) => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="numQuestions" className="form-label">Number of Questions</label>
        <input type="number" className="form-control" id="numQuestions" name="numQuestions" min="1" max="10" value={formData.numQuestions} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="language" className="form-label">Language</label>
        <select className="form-select" id="language" name="language" value={formData.language} onChange={handleChange} required>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
          <option value="Arabic">Arabic</option>
          <option value="French">French</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="level" className="form-label">Quiz Level</label>
        <select className="form-select" id="level" name="level" value={formData.level} onChange={handleChange} required>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button 
        type="submit" 
        className={`btn btn-primary w-100 ${loading ? 'btn-loading' : ''}`}
        disabled={loading}
      >
        {loading ? '' : 'Generate Quiz'}
      </button>
    </form>
  );
};

export default QuizForm;
