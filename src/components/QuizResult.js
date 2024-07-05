import React from 'react';

const QuizResult = ({ results, onNewQuiz }) => {
  if (!results || !results.results || results.results.length === 0) {
    return <div>No results available. Please take a quiz first.</div>;
  }

  const calculatedScore = results.results.reduce((score, result) => 
    result.is_correct ? score + 1 : score, 0);

  const totalQuestions = results.results.length;

  const handleNewQuiz = () => {
    // Call the onNewQuiz function to reset the state in the parent component
    onNewQuiz();
  };

  return (
    <div className="quiz-result">
      <h2>Quiz Results</h2>
      <h3>Your score: {calculatedScore} / {totalQuestions}</h3>
      {results.results.map((result, idx) => (
        <div key={idx} className="result-item">
          <p><strong>Question {idx + 1}: {result.question}</strong></p>
          <p>Your answer: <span className={result.is_correct ? 'correct' : 'incorrect'}>{result.user_answer}</span></p>
          <p>Correct answer: <span className="correct">{result.correct_answer}</span></p>
        </div>
      ))}
      <button onClick={handleNewQuiz} className="btn">Generate New Quiz</button>
    </div>
  );
};

export default QuizResult;