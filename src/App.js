import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizForm from './components/QuizForm';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import './App.css';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleNewQuiz = () => {
    setQuizData(null);
    setQuizResults(null);
    setShowResults(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={
            <>
              <aside className="sidebar">
                <QuizForm setQuizData={setQuizData} />
              </aside>
              <main className="main-content">
                {!quizData && !showResults && (
                  <div className="placeholder">
                    <h2>Welcome to QuizWiz</h2>
                    <p>Generate a quiz using the form on the left to get started.</p>
                  </div>
                )}
                {quizData && !showResults && (
                  <Quiz 
                    quizData={quizData} 
                    onQuizComplete={(results) => {
                      setQuizResults(results);
                      setShowResults(true);
                    }} 
                  />
                )}
                {showResults && (
                  <QuizResult 
                    results={quizResults} 
                    onNewQuiz={handleNewQuiz} 
                  />
                )}
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;