import React from 'react';
import './Portfolio.css';

function Portfolio() {
  const benefits = [
    {
      icon: '🎯',
      title: 'Strategy Diversification',
      description: 'Combine momentum, mean reversion, and volatility strategies to smooth returns'
    },
    {
      icon: '📊',
      title: 'Performance Tracking',
      description: 'Monitor each strategy contribution to your overall portfolio'
    },
    {
      icon: '⚖️',
      title: 'Risk Management',
      description: 'Balance high-risk and high-reward with stable consistent strategies'
    },
    {
      icon: '🔄',
      title: 'Rebalancing Alerts',
      description: 'Know when to adjust allocations based on changing market conditions'
    }
  ];

  const portfolioStrategies = [
    { strategy: 'Bollinger Band Squeeze', allocation: 25, avgReturn: 7.2, risk: 'Medium' },
    { strategy: 'RSI Oversold/Overbought', allocation: 20, avgReturn: 5.8, risk: 'Low' },
    { strategy: 'MACD Crossover', allocation: 20, avgReturn: 6.4, risk: 'Low' },
    { strategy: 'ADX Trend Strength', allocation: 15, avgReturn: 8.1, risk: 'High' },
    { strategy: 'Mean Reversion to SMA', allocation: 20, avgReturn: 6.0, risk: 'Medium' }
  ];

  const portfolioStats = {
    totalReturn: '+42.8%',
    sharpeRatio: '1.9',
    maxDrawdown: '-11.2%',
    winRate: '68.5%',
    avgMonthly: '+3.2%',
    volatility: '14.3%'
  };

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="section-header">
        <h2 className="section-title">Portfolio Management</h2>
        <p className="section-subtitle">
          Combine multiple strategies to build a robust, diversified trading portfolio
        </p>
      </div>

      <div className="portfolio-hero card">
        <h3 className="portfolio-hero-title">Sample Diversified Portfolio</h3>
        <p className="portfolio-hero-subtitle">5 Strategies • $50,000 Total Capital • 2 Year Performance</p>
        
        <div className="portfolio-chart">
          {portfolioStrategies.map((item, index) => (
            <div 
              key={index} 
              className="portfolio-segment" 
              style={{
                width: `${item.allocation}%`,
                background: `hsl(${index * 70}, 70%, 60%)`
              }}
              title={`${item.strategy}: ${item.allocation}%`}
            >
              <span className="segment-label">{item.allocation}%</span>
            </div>
          ))}
        </div>

        <div className="portfolio-strategies-list">
          {portfolioStrategies.map((item, index) => (
            <div key={index} className="portfolio-strategy-item">
              <div className="strategy-info">
                <div 
                  className="strategy-color" 
                  style={{background: `hsl(${index * 70}, 70%, 60%)`}}
                ></div>
                <div>
                  <div className="strategy-item-name">{item.strategy}</div>
                  <div className="strategy-item-risk">Risk: {item.risk}</div>
                </div>
              </div>
              <div className="strategy-stats">
                <div className="strategy-allocation">{item.allocation}%</div>
                <div className="strategy-return">+{item.avgReturn}%/mo</div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-metrics">
          <div className="metric-item">
            <div className="metric-label">Total Return</div>
            <div className="metric-value positive">{portfolioStats.totalReturn}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Sharpe Ratio</div>
            <div className="metric-value">{portfolioStats.sharpeRatio}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Max Drawdown</div>
            <div className="metric-value negative">{portfolioStats.maxDrawdown}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Win Rate</div>
            <div className="metric-value">{portfolioStats.winRate}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Avg Monthly</div>
            <div className="metric-value positive">{portfolioStats.avgMonthly}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Volatility</div>
            <div className="metric-value">{portfolioStats.volatility}</div>
          </div>
        </div>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card card">
            <div className="benefit-icon">{benefit.icon}</div>
            <h4 className="benefit-title">{benefit.title}</h4>
            <p className="benefit-description">{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="portfolio-tips card">
        <h3 className="tips-title">💡 Portfolio Management Tips</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <strong>Start Small:</strong> Begin with 2-3 strategies before expanding
          </div>
          <div className="tip-item">
            <strong>Mix Strategy Types:</strong> Combine momentum + mean reversion
          </div>
          <div className="tip-item">
            <strong>Monitor Performance:</strong> Review monthly, adjust quarterly
          </div>
          <div className="tip-item">
            <strong>Set Stop Losses:</strong> Protect capital with risk limits
          </div>
          <div className="tip-item">
            <strong>Paper Trade First:</strong> Test with virtual money before real funds
          </div>
          <div className="tip-item">
            <strong>Stay Disciplined:</strong> Follow your strategy, avoid emotional trades
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
