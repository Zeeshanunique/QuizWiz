import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = ({ quizData, setResults }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  const handleChange = (e, questionIndex) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/submit_quiz', userAnswers);
      setResults(response.data);
      navigate('/result');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quizData) {
    return <p className="no-quiz-data">No quiz data available. Please generate a quiz first.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="quiz-container">
      {quizData.map((question, idx) => (
        <div key={idx} className="quiz-question">
          <h5>Question {idx + 1}: {question.question}</h5>
          <div className="quiz-options">
            {question.options.map((option, optionIdx) => (
              <div key={optionIdx} className="quiz-option">
                <input
                  type="radio"
                  name={`group_${idx + 1}`}
                  id={`option_${idx + 1}_${optionIdx}`}
                  value={option}
                  onChange={(e) => handleChange(e, `group_${idx + 1}`)}
                  required
                />
                <label htmlFor={`option_${idx + 1}_${optionIdx}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="submit" className="quiz-submit-btn">Submit Quiz</button>
    </form>
  );
};

export default Quiz;