import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to QuizWiz</h1>
        <p>Test your knowledge with fun and challenging quizzes!</p>
      </header>
      <main className="home-main">
        <section className="features">
          <div className="feature">
            <i className="fas fa-brain" aria-label="Learn Icon"></i>
            <h3>Learn</h3>
            <p>Expand your knowledge on various topics</p>
          </div>
          <div className="feature">
            <i className="fas fa-puzzle-piece" aria-label="Challenge Icon"></i>
            <h3>Challenge</h3>
            <p>Test yourself with diverse questions</p>
          </div>
          <div className="feature">
            <i className="fas fa-chart-line" aria-label="Improve Icon"></i>
            <h3>Improve</h3>
            <p>Track your progress and grow</p>
          </div>
        </section>
        <Link to="/quiz" className="start-button">Start Quiz</Link>
      </main>
      <footer className="home-footer">
        <p>&copy; 2024 QuizWiz. All rights reserved.</p>
        Created by Zeeshan Ali
      </footer>
    </div>
  );
}

export default HomePage;
