import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import TodaysRecommendations from './components/TodaysRecommendations';
import PortfolioPage from './components/PortfolioPage';
import HistoricalPerformance from './components/HistoricalPerformance';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recommendations" element={<TodaysRecommendations />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/performance" element={<HistoricalPerformance />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
