import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-icon">⚡</span>
            <div className="logo-content">
              <span className="logo-text">SURGE</span>
              <span className="logo-subtitle">Strategic Universal Return Generation Engine</span>
            </div>
          </Link>
        </div>

        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/')}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          
          <Link 
            to="/recommendations" 
            className={`nav-link ${isActive('/recommendations')}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">🎯</span>
            Today's Picks
          </Link>
          
          <Link 
            to="/portfolio" 
            className={`nav-link ${isActive('/portfolio')}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">💼</span>
            Portfolio
          </Link>
          
          <Link 
            to="/performance" 
            className={`nav-link ${isActive('/performance')}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">📊</span>
            Performance
          </Link>
          
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about')}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">ℹ️</span>
            About
          </Link>
        </div>

        {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
      </div>
    </nav>
  );
};

export default Navigation;
