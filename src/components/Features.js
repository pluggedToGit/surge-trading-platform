import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Multiple Data Sources',
      description: 'Yahoo Finance (free), Polygon.io, Alpaca, or your own CSV files. Choose what works best for you.'
    },
    {
      icon: '🎯',
      title: 'Daily Trading Signals',
      description: 'Get BUY/SELL/HOLD recommendations based on current technical indicators and market conditions.'
    },
    {
      icon: '📈',
      title: 'Historical Backtesting',
      description: 'Test strategies on 2+ years of historical data. See real performance metrics and risk-adjusted returns.'
    },
    {
      icon: '⚡',
      title: '30+ Strategies',
      description: 'Momentum, mean reversion, volatility, and seasonal strategies. All battle-tested and customizable.'
    },
    {
      icon: '💼',
      title: 'Portfolio Management',
      description: 'Track multiple strategies simultaneously. Diversify and optimize your trading approach.'
    },
    {
      icon: '📉',
      title: 'Risk Metrics',
      description: 'Sharpe ratio, maximum drawdown, win rate, and more. Understand your risk before trading.'
    },
    {
      icon: '🔧',
      title: 'Fully Customizable',
      description: 'Adjust parameters, create your own strategies, and tailor the system to your trading style.'
    },
    {
      icon: '🚀',
      title: 'Leveraged ETF Focus',
      description: 'Optimized for TQQQ/SQQQ trading. Beat simple buy-and-hold with intelligent timing.'
    }
  ];

  return (
    <section id="features" className="section features-section">
      <div className="section-header">
        <h2 className="section-title">Powerful Features</h2>
        <p className="section-subtitle">
          Everything you need to make informed trading decisions and beat the market
        </p>
      </div>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card card fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
