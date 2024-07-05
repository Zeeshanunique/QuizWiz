import React, { useState, useEffect } from 'react';

const Quiz = ({ quizData, onQuizComplete }) => {
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (quizData) {
      setUserAnswers({});
    }
  }, [quizData]);

  const handleChange = (e, questionIndex) => {
    setUserAnswers({ ...userAnswers, [`question_${questionIndex}`]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/submit_quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAnswers),
      });
      const results = await response.json();
      onQuizComplete(results);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quizData || !quizData.questions) {
    return <p>No quiz available. Please generate a quiz first.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {quizData.questions.map((question, idx) => (
        <div key={idx} className="quiz-question">
          <h4>{question.question}</h4>
          <div className="quiz-options">
            {question.options.map((option, optionIdx) => (
              <div key={optionIdx} className="quiz-option">
                <input
                  type="radio"
                  id={`question_${idx}_option_${optionIdx}`}
                  name={`question_${idx}`}
                  value={option}
                  onChange={(e) => handleChange(e, idx)}
                />
                <label htmlFor={`question_${idx}_option_${optionIdx}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="submit" className="btn">Submit Quiz</button>
    </form>
  );
};

export default Quiz;