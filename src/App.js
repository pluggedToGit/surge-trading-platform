import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import TodaysRecommendations from './components/TodaysRecommendations';
import PortfolioPage from './components/PortfolioPage';
import HistoricalPerformance from './components/HistoricalPerformance';
import About from './components/About';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            
            {/* Protected Routes - Require Login */}
            <Route 
              path="/recommendations" 
              element={
                <PrivateRoute>
                  <TodaysRecommendations />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/portfolio" 
              element={
                <PrivateRoute>
                  <PortfolioPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/performance" 
              element={
                <PrivateRoute>
                  <HistoricalPerformance />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
