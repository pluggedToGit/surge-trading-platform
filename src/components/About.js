import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About SURGE Trading</h1>
        <p className="subtitle">Tax-aware algorithmic trading strategies</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>🎯 What is SURGE?</h2>
          <p>
            SURGE is an intelligent trading platform that analyzes historical market data
            to recommend optimal trading strategies for your portfolio. Unlike traditional
            backtesting tools, SURGE incorporates real-world constraints like taxes and
            transaction costs to provide accurate, actionable recommendations.
          </p>
        </section>

        <section className="about-section">
          <h2>📊 Our Strategies</h2>
          <div className="strategies-grid">
            <div className="strategy-card">
              <h3>Moving Average Crossover</h3>
              <p>Identifies trend changes using fast and slow moving averages.</p>
            </div>
            <div className="strategy-card">
              <h3>RSI Strategy</h3>
              <p>Buys oversold and sells overbought conditions based on RSI indicator.</p>
            </div>
            <div className="strategy-card">
              <h3>MACD</h3>
              <p>Trades on momentum shifts using MACD crossovers and signals.</p>
            </div>
            <div className="strategy-card">
              <h3>Bollinger Bands</h3>
              <p>Exploits price extremes relative to volatility bands.</p>
            </div>
            <div className="strategy-card">
              <h3>Breakout Strategy</h3>
              <p>Captures momentum from price breaking new highs.</p>
            </div>
            <div className="strategy-card">
              <h3>Mean Reversion</h3>
              <p>Trades on the assumption that prices return to their average.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>💡 Key Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h4>Tax-Aware Backtesting</h4>
                <p>Accurately models 30% capital gains tax on realized profits</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h4>Volatility-Based Confidence</h4>
                <p>Predicts strategy effectiveness based on market volatility</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h4>Buy-Hold Comparison</h4>
                <p>Only recommends strategies that beat simple buy-and-hold</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h4>Portfolio Tracking</h4>
                <p>Maintains your actual positions and trade history</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h4>Actionable Trade Instructions</h4>
                <p>Tells you exactly what to trade based on current holdings</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h4>Serverless Architecture</h4>
                <p>Deployed on AWS Lambda + DynamoDB for high availability</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>⚠️ Disclaimer</h2>
          <div className="disclaimer-box">
            <p>
              <strong>Not Financial Advice:</strong> SURGE is an educational tool for
              exploring algorithmic trading strategies. Past performance does not guarantee
              future results. Always do your own research and consult with a qualified
              financial advisor before making investment decisions.
            </p>
            <p>
              <strong>Risk Warning:</strong> Trading stocks involves risk. You may lose
              some or all of your investment. Only invest what you can afford to lose.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>🚀 Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <span>React 18</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🐍</span>
              <span>Python 3.14</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">⚡</span>
              <span>AWS Lambda</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🗄️</span>
              <span>DynamoDB</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">📊</span>
              <span>Chart.js</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🌐</span>
              <span>API Gateway</span>
            </div>
          </div>
        </section>

        <section className="about-section cta-section">
          <h2>Ready to Start?</h2>
          <p>Check out today's recommendations and begin tracking your portfolio!</p>
          <div className="cta-buttons">
            <a href="/" className="cta-btn primary">View Recommendations</a>
            <a href="/portfolio" className="cta-btn secondary">Manage Portfolio</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
