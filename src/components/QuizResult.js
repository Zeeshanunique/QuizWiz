import React from 'react';

const QuizResult = ({ results, onNewQuiz }) => {
  if (!results || !results.results || results.results.length === 0) {
    return <div>No results available. Please take a quiz first.</div>;
  }

  const { score, total, results: quizResults } = results;

  const handleNewQuiz = () => {
    onNewQuiz();
  };

  return (
    <div className="quiz-result">
      <h2>Quiz Results</h2>
      <h3>Your score: {score} / {total}</h3>
      {quizResults.map((result, idx) => (
        <div key={idx} className="result-item">
          <p><strong>Question {idx + 1}: {result.question}</strong></p>
          <p>Your answer: <span className={result.is_correct ? 'correct' : 'incorrect'}>{result.user_answer || 'Not answered'}</span></p>
          <p>Correct answer: <span className="correct">{result.correct_answer}</span></p>
        </div>
      ))}
      <button onClick={handleNewQuiz} className="btn">Generate New Quiz</button>
    </div>
  );
};

export default QuizResult;