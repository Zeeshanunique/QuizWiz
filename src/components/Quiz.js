import React, { useState, useEffect } from 'react';

const Quiz = ({ quizData, onQuizComplete }) => {
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (quizData) {
      setUserAnswers({});
    }
  }, [quizData]);

  const handleChange = (e, questionIndex) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate quiz submission
    const results = {
      score: Math.floor(Math.random() * (quizData?.length || 5)) + 1,
      total: quizData?.length || 5,
      results: quizData?.map((q, idx) => ({
        question: q.question,
        user_answer: userAnswers[`question_${idx}`] || 'Not answered',
        correct_answer: q.options[0], // Assuming the first option is always correct for this example
        is_correct: userAnswers[`question_${idx}`] === q.options[0],
      })) || [],
    };
    onQuizComplete(results);
  };

  if (!quizData) {
    return <p>No quiz available. Please generate a quiz first.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {quizData.map((question, idx) => (
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
                  onChange={(e) => handleChange(e, `question_${idx}`)}
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