import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        {/*<div className="hero-badge">
          <span className="badge-icon">⚡</span>
          <span>Strategic Universal Return Generation Engine</span>
        </div>*/}
        
        <h1 className="hero-title">
          Beat the Market with
          <span className="gradient-text"> Data-Driven Strategies</span>
        </h1>
        
        <p className="hero-description">
          SURGE analyzes 30+ proven trading strategies across momentum, mean reversion, 
          and volatility patterns. Backtest historical performance and get daily recommendations 
          to outperform TQQQ and SQQQ buy-and-hold strategies.
        </p>
        
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number">30+</div>
            <div className="stat-label">Trading Strategies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">Data Sources</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Open Source</div>
          </div>
        </div>
        
        <div className="hero-cta">
          <a href="#strategies" className="btn btn-primary">Explore Strategies</a>
          <a href="#how-it-works" className="btn btn-secondary">How It Works</a>
        </div>
        
        <div className="hero-highlight">
          <div className="highlight-box">
            <span className="highlight-icon">📈</span>
            <div>
              <strong>Daily Signals:</strong> Get BUY/SELL/HOLD recommendations based on real-time technical analysis
            </div>
          </div>
          <div className="highlight-box">
            <span className="highlight-icon">🎯</span>
            <div>
              <strong>Backtested Performance:</strong> See how each strategy would have performed historically
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="chart-mockup">
          <div className="chart-header">
            <span className="chart-title">Strategy Performance</span>
            <span className="chart-period">2 Years</span>
          </div>
          <div className="chart-bars">
            <div className="bar" style={{height: '60%', background: 'linear-gradient(180deg, #10b981, #059669)'}}>
              <span className="bar-label">+45%</span>
            </div>
            <div className="bar" style={{height: '35%', background: 'linear-gradient(180deg, #6366f1, #4f46e5)'}}>
              <span className="bar-label">+22%</span>
            </div>
            <div className="bar" style={{height: '80%', background: 'linear-gradient(180deg, #ec4899, #db2777)'}}>
              <span className="bar-label">+67%</span>
            </div>
            <div className="bar" style={{height: '50%', background: 'linear-gradient(180deg, #f59e0b, #d97706)'}}>
              <span className="bar-label">+31%</span>
            </div>
          </div>
          <div className="chart-labels">
            <span>RSI</span>
            <span>MACD</span>
            <span>BB</span>
            <span>MA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
