import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Get Historical Data',
      description: 'Automatically download data from Yahoo Finance, Polygon.io, Alpaca, or use your own CSV files.',
      details: ['Daily OHLCV data', 'Multiple data sources', 'No manual input required', 'Up to 10+ years history'],
      icon: '📥'
    },
    {
      number: '2',
      title: 'Apply Trading Strategies',
      description: 'System analyzes data using 30+ proven technical analysis strategies.',
      details: ['Momentum indicators', 'Mean reversion signals', 'Volatility analysis', 'Pattern recognition'],
      icon: '🎯'
    },
    {
      number: '3',
      title: 'Simulate Trading',
      description: 'Backtest each strategy on historical data to see real performance.',
      details: ['Virtual $10,000 initial capital', 'Buy/sell based on signals', 'Track portfolio value', 'No real money risk'],
      icon: '💹'
    },
    {
      number: '4',
      title: 'Analyze Performance',
      description: 'Review comprehensive metrics to understand strategy effectiveness.',
      details: ['Total return %', 'Sharpe ratio', 'Maximum drawdown', 'Win rate & consistency'],
      icon: '📊'
    },
    {
      number: '5',
      title: 'Get Today\'s Signals',
      description: 'Receive BUY/SELL/HOLD recommendations based on current market conditions.',
      details: ['Real-time analysis', 'Multi-strategy consensus', 'Confidence scores', 'Risk assessment'],
      icon: '🚀'
    },
    {
      number: '6',
      title: 'Manage Portfolio',
      description: 'Combine multiple strategies to diversify and optimize returns.',
      details: ['Strategy diversification', 'Risk management', 'Performance tracking', 'Beat buy-and-hold'],
      icon: '💼'
    }
  ];

  const analysisProcess = {
    title: 'Strategy Analysis Process',
    steps: [
      {
        name: 'Technical Indicators',
        items: ['RSI (Relative Strength Index)', 'MACD (Moving Average Convergence Divergence)', 'Bollinger Bands', 'Moving Averages', 'ATR (Average True Range)', 'Stochastic Oscillator']
      },
      {
        name: 'Signal Generation',
        items: ['Compare indicators to thresholds', 'Identify crossovers', 'Detect overbought/oversold', 'Spot trend changes']
      },
      {
        name: 'Position Management',
        items: ['Generate BUY signals', 'Generate SELL signals', 'Hold when neutral', 'Track portfolio value']
      },
      {
        name: 'Performance Calculation',
        items: ['Calculate returns', 'Risk-adjusted metrics', 'Drawdown analysis', 'Compare to benchmark']
      }
    ]
  };

  return (
    <section id="how-it-works" className="section how-it-works-section">
      <div className="section-header">
        <h2 className="section-title">How SURGE Works</h2>
        <p className="section-subtitle">
          From data collection to daily trading signals - here's the complete process
        </p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card card">
            <div className="step-number-container">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
            </div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              <ul className="step-details">
                {step.details.map((detail, i) => (
                  <li key={i}><span className="check-icon">✓</span> {detail}</li>
                ))}
              </ul>
            </div>
            {index < steps.length - 1 && <div className="step-arrow">↓</div>}
          </div>
        ))}
      </div>

      <div className="analysis-section">
        <h3 className="analysis-title">{analysisProcess.title}</h3>
        <div className="analysis-grid">
          {analysisProcess.steps.map((step, index) => (
            <div key={index} className="analysis-card card">
              <h4 className="analysis-name">{step.name}</h4>
              <ul className="analysis-items">
                {step.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="code-example card">
        <h3 className="code-title">📝 Quick Start Code Example</h3>
        <pre className="code-block">
{`# Install required packages
pip install yfinance pandas numpy

# Run complete analysis
python run_complete_analysis.py

# Output:
# ✅ 30+ strategies tested
# ✅ Performance metrics calculated  
# ✅ Today's recommendations generated`}
        </pre>
      </div>
    </section>
  );
}

export default HowItWorks;
