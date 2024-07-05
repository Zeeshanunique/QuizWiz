import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizResult = ({ results }) => {
  const navigate = useNavigate();

  if (!results) {
    return <div style={{ textAlign: 'center', color: '#fff', marginTop: '2rem' }}>No results available. Please take a quiz first.</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#007bff', textAlign: 'center', marginBottom: '1.5rem' }}>Quiz Results</h2>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your score: {results.score} / {results.total}</h3>
      {results.results.map((result, idx) => (
        <div key={idx} style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{result.question}</p>
          <p style={{ marginBottom: '0.25rem' }}>Your answer: <span style={{ color: result.is_correct ? '#28a745' : '#dc3545' }}>{result.user_answer || 'Not answered'}</span></p>
          <p style={{ marginBottom: '0.25rem' }}>Correct answer: <span style={{ color: '#28a745' }}>{result.correct_answer}</span></p>
          <p style={{ fontWeight: 'bold', color: result.is_correct ? '#28a745' : '#dc3545' }}>
            {result.is_correct ? 'Correct!' : 'Incorrect'}
          </p>
        </div>
      ))}
      <button 
        onClick={() => navigate('/')} 
        style={{
          display: 'block',
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.15s ease-in-out'
        }}
      >
        Generate New Quiz
      </button>
    </div>
  );
};

export default QuizResult;