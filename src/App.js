import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Features from './components/Features';
import Strategies from './components/Strategies';
import Recommendations from './components/Recommendations';
import HowItWorks from './components/HowItWorks';
import Performance from './components/Performance';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">SURGE</span>
            <span className="logo-subtitle">Strategic Universal Return Generation Engine</span>
          </div>
          <div className="nav-links">
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#strategies">Strategies</a>
            <a href="#recommendations">Today's Picks</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#performance">Performance</a>
            <a href="#portfolio">Portfolio</a>
          </div>
        </div>
      </nav>

      <Hero />
      <Features />
      <Strategies />
      <div id="recommendations">
        <Recommendations />
      </div>
      <HowItWorks />
      <Performance />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;
