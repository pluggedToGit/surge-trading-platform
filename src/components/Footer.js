import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">SURGE</span>
          </div>
          <p className="footer-description">
            Strategic Universal Return Generation Engine - Your data-driven trading companion
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#strategies">Strategies</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#performance">Performance</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Resources</h4>
          <ul className="footer-links">
            <li><a href="#portfolio">Portfolio Management</a></li>
            <li><a href="#hero">Documentation</a></li>
            <li><a href="#hero">GitHub Repository</a></li>
            <li><a href="#hero">API Reference</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Disclaimer</h4>
          <p className="footer-disclaimer">
            This software is for educational purposes only. Past performance does not guarantee future results. 
            Always conduct your own research and consider consulting a financial advisor.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 SURGE Trading Platform. Open Source Project.</p>
        <p className="footer-warning">
          ⚠️ Trading involves risk. Only invest what you can afford to lose.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
