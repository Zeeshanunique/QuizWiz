import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizForm from './components/QuizForm';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import './App.css';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [results, setResults] = useState(null);

  return (
    <Router>
      <div className="container">
        <h1 className="text-center mb-4">QuizWiz with LLM</h1>
        <Routes>
          <Route path="/" element={<QuizForm setQuizData={setQuizData} />} />
          <Route
            path="/quiz"
            element={<Quiz quizData={quizData} setResults={setResults} />}
          />
          <Route
            path="/result"
            element={<QuizResult results={results} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
