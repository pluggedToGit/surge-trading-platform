import React, { useState } from 'react';
import './Performance.css';

function Performance() {
  const [selectedTicker, setSelectedTicker] = useState('TQQQ');

  const performanceData = {
    TQQQ: {
      buyAndHold: 45.2,
      topStrategy: 'Bollinger Band Squeeze',
      strategyReturn: 89.7,
      improvement: 98.5,
      strategies: [
        { name: 'Bollinger Band Squeeze', return: 89.7, sharpe: 2.1, drawdown: -12.3 },
        { name: 'Z-Score Mean Reversion', return: 82.4, sharpe: 1.9, drawdown: -15.1 },
        { name: 'Pair Trading TQQQ/SQQQ', return: 76.8, sharpe: 1.8, drawdown: -11.8 },
        { name: 'ADX Trend Strength', return: 71.5, sharpe: 1.7, drawdown: -14.2 },
        { name: 'Triple Moving Average', return: 68.3, sharpe: 1.6, drawdown: -16.5 }
      ]
    },
    SQQQ: {
      buyAndHold: -32.5,
      topStrategy: 'Mean Reversion to SMA',
      strategyReturn: 34.2,
      improvement: 205.2,
      strategies: [
        { name: 'Mean Reversion to SMA', return: 34.2, sharpe: 1.4, drawdown: -18.5 },
        { name: 'RSI Oversold/Overbought', return: 28.7, sharpe: 1.3, drawdown: -20.2 },
        { name: 'Consecutive Down Days', return: 25.9, sharpe: 1.2, drawdown: -19.1 },
        { name: 'Gap Fill Strategy', return: 22.4, sharpe: 1.1, drawdown: -21.8 },
        { name: 'Williams %R', return: 19.8, sharpe: 1.0, drawdown: -22.5 }
      ]
    },
    QQQ: {
      buyAndHold: 28.3,
      topStrategy: 'Moving Average Crossover',
      strategyReturn: 42.1,
      improvement: 48.8,
      strategies: [
        { name: 'Moving Average Crossover', return: 42.1, sharpe: 1.8, drawdown: -9.2 },
        { name: 'MACD Crossover', return: 38.6, sharpe: 1.7, drawdown: -10.5 },
        { name: 'Breakout Strategy', return: 36.2, sharpe: 1.6, drawdown: -11.3 },
        { name: 'RSI Momentum', return: 34.8, sharpe: 1.5, drawdown: -12.1 },
        { name: 'Rate of Change', return: 32.5, sharpe: 1.4, drawdown: -13.2 }
      ]
    }
  };

  const currentData = performanceData[selectedTicker];

  return (
    <section id="performance" className="section performance-section">
      <div className="section-header">
        <h2 className="section-title">Beat Buy-and-Hold</h2>
        <p className="section-subtitle">
          See how strategic trading outperforms simple buy-and-hold approaches
        </p>
      </div>

      <div className="ticker-selector">
        {Object.keys(performanceData).map(ticker => (
          <button
            key={ticker}
            className={`ticker-btn ${selectedTicker === ticker ? 'active' : ''}`}
            onClick={() => setSelectedTicker(ticker)}
          >
            {ticker}
          </button>
        ))}
      </div>

      <div className="performance-comparison">
        <div className="comparison-card card">
          <div className="comparison-label">📊 Buy & Hold</div>
          <div className={`comparison-value ${currentData.buyAndHold > 0 ? 'positive' : 'negative'}`}>
            {currentData.buyAndHold > 0 ? '+' : ''}{currentData.buyAndHold}%
          </div>
          <div className="comparison-description">Simple buy and hold strategy</div>
        </div>

        <div className="comparison-arrow">→</div>

        <div className="comparison-card card highlight">
          <div className="comparison-label">⚡ Best Strategy</div>
          <div className="comparison-value positive">
            +{currentData.strategyReturn}%
          </div>
          <div className="comparison-description">{currentData.topStrategy}</div>
        </div>

        <div className="improvement-badge">
          <span className="improvement-icon">🚀</span>
          <span className="improvement-text">
            +{currentData.improvement}% Better
          </span>
        </div>
      </div>

      <div className="strategies-performance">
        <h3 className="performance-subtitle">Top 5 Performing Strategies</h3>
        <div className="performance-table">
          <div className="table-header">
            <div className="table-cell">Strategy</div>
            <div className="table-cell">Total Return</div>
            <div className="table-cell">Sharpe Ratio</div>
            <div className="table-cell">Max Drawdown</div>
          </div>
          {currentData.strategies.map((strategy, index) => (
            <div key={index} className="table-row">
              <div className="table-cell strategy-name-cell">
                <span className="rank-badge">{index + 1}</span>
                {strategy.name}
              </div>
              <div className="table-cell positive">+{strategy.return}%</div>
              <div className="table-cell">{strategy.sharpe}</div>
              <div className="table-cell negative">{strategy.drawdown}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="performance-insights grid-3">
        <div className="insight-card card">
          <div className="insight-icon">💡</div>
          <h4 className="insight-title">Why It Works</h4>
          <p className="insight-text">
            Strategic timing beats buy-and-hold by capturing trends and avoiding major drawdowns.
            Especially powerful with leveraged ETFs like TQQQ/SQQQ.
          </p>
        </div>
        <div className="insight-card card">
          <div className="insight-icon">⚠️</div>
          <h4 className="insight-title">Risk Management</h4>
          <p className="insight-text">
            Lower maximum drawdowns mean less stomach-churning volatility. 
            Sleep better knowing you're protected during market crashes.
          </p>
        </div>
        <div className="insight-card card">
          <div className="insight-icon">🎯</div>
          <h4 className="insight-title">Consistency</h4>
          <p className="insight-text">
            High Sharpe ratios indicate consistent risk-adjusted returns.
            Not just lucky trades, but repeatable patterns.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Performance;
