import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './HistoricalPerformance.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HistoricalPerformance = () => {
  const [selectedTicker, setSelectedTicker] = useState('TQQQ');
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiUrl] = useState('http://127.0.0.1:5454');
  const [timePeriod, setTimePeriod] = useState('5y');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [useCustomDates, setUseCustomDates] = useState(false);
  const [expandedStrategy, setExpandedStrategy] = useState(null);
  const [initialCapital, setInitialCapital] = useState(10000);
  const [tempCapital, setTempCapital] = useState('10000');

  const tickers = ['TQQQ', 'SQQQ', 'AMD', 'TSLA', 'RKLB'];

  useEffect(() => {
    loadHistoricalData();
  }, [selectedTicker, timePeriod, customStartDate, customEndDate, useCustomDates, initialCapital]);

  const loadHistoricalData = async () => {
    setLoading(true);
    try {
      const startDate = useCustomDates && customStartDate ? customStartDate : getStartDate();
      const endDate = useCustomDates && customEndDate ? customEndDate : new Date().toISOString().split('T')[0];
      
      const response = await fetch(`${apiUrl}/api/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickers: [selectedTicker],
          date: endDate,
          start_date: startDate,
          initial_capital: initialCapital,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract the data for the selected ticker
      if (data.recommendations && data.recommendations.length > 0) {
        setPerformanceData(data.recommendations[0]);
      } else {
        setPerformanceData(null);
      }
    } catch (error) {
      console.error('Error loading historical data:', error);
      setPerformanceData(null);
    } finally {
      setLoading(false);
    }
  };

  const getStartDate = () => {
    const now = new Date();
    switch (timePeriod) {
      case '1y':
        return new Date(now.setFullYear(now.getFullYear() - 1)).toISOString().split('T')[0];
      case '3y':
        return new Date(now.setFullYear(now.getFullYear() - 3)).toISOString().split('T')[0];
      case '5y':
        return new Date(now.setFullYear(now.getFullYear() - 5)).toISOString().split('T')[0];
      case '10y':
        return new Date(now.setFullYear(now.getFullYear() - 10)).toISOString().split('T')[0];
      default:
        return '1980-01-01';
    }
  };

  const handlePeriodChange = (period) => {
    setTimePeriod(period);
    setUseCustomDates(false);
  };

  const handleCustomDateSubmit = () => {
    if (customStartDate && customEndDate) {
      setUseCustomDates(true);
      loadHistoricalData();
    }
  };

  const handleCapitalChange = (e) => {
    setTempCapital(e.target.value);
  };

  const handleCapitalSubmit = () => {
    const capital = parseFloat(tempCapital);
    if (!isNaN(capital) && capital > 0) {
      setInitialCapital(capital);
    } else {
      alert('Please enter a valid amount greater than 0');
      setTempCapital(initialCapital.toString());
    }
  };

  const toggleStrategyExpansion = (index) => {
    setExpandedStrategy(expandedStrategy === index ? null : index);
  };

  const formatChartData = (recommendation) => {
    if (!recommendation?.historical_performance || recommendation.historical_performance.length === 0) {
      return null;
    }

    const strategyData = recommendation.historical_performance.map(d => d.portfolio_value);
    const buyHoldData = recommendation.buy_hold_performance?.map(d => d.portfolio_value) || [];
    const labels = recommendation.historical_performance.map(d => d.date);

    return {
      labels: labels,
      datasets: [
        {
          label: `${recommendation.strategy} Strategy`,
          data: strategyData,
          borderColor: 'rgb(102, 126, 234)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
        },
        {
          label: `${selectedTicker} Buy & Hold`,
          data: buyHoldData,
          borderColor: 'rgb(255, 193, 7)',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          borderDash: [5, 5],
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#fff' },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: {
          color: '#999',
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="historical-performance-page">
      <div className="performance-header">
        <h1>📊 Historical Performance</h1>
        <p className="subtitle">Explore backtested strategy performance across different time periods</p>
      </div>

      <div className="performance-controls">
        <div className="capital-selector">
          <label>Initial Account Value:</label>
          <div className="capital-input-group">
            <span className="dollar-sign">$</span>
            <input
              type="number"
              value={tempCapital}
              onChange={handleCapitalChange}
              onBlur={handleCapitalSubmit}
              onKeyPress={(e) => e.key === 'Enter' && handleCapitalSubmit()}
              min="100"
              step="1000"
              placeholder="10000"
            />
            <button 
              className="apply-capital-btn"
              onClick={handleCapitalSubmit}
            >
              Apply
            </button>
          </div>
          <div className="capital-presets">
            <button onClick={() => { setTempCapital('10000'); setInitialCapital(10000); }}>$10K</button>
            <button onClick={() => { setTempCapital('25000'); setInitialCapital(25000); }}>$25K</button>
            <button onClick={() => { setTempCapital('50000'); setInitialCapital(50000); }}>$50K</button>
            <button onClick={() => { setTempCapital('100000'); setInitialCapital(100000); }}>$100K</button>
          </div>
        </div>

        <div className="ticker-selector">
          <label>Select Ticker:</label>
          <div className="ticker-buttons">
            {tickers.map((ticker) => (
              <button
                key={ticker}
                className={`ticker-btn ${selectedTicker === ticker ? 'active' : ''}`}
                onClick={() => setSelectedTicker(ticker)}
              >
                {ticker}
              </button>
            ))}
          </div>
        </div>

        <div className="period-selector">
          <label>Time Period:</label>
          <div className="period-buttons">
            {['1y', '3y', '5y', '10y', 'all'].map((period) => (
              <button
                key={period}
                className={`period-btn ${timePeriod === period && !useCustomDates ? 'active' : ''}`}
                onClick={() => handlePeriodChange(period)}
              >
                {period === 'all' ? 'All Time' : period.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="custom-date-selector">
          <label>Custom Date Range:</label>
          <div className="date-inputs">
            <div className="date-input-group">
              <label htmlFor="start-date">Start Date:</label>
              <input
                id="start-date"
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                max={customEndDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="date-input-group">
              <label htmlFor="end-date">End Date:</label>
              <input
                id="end-date"
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                min={customStartDate}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <button 
              className="apply-dates-btn"
              onClick={handleCustomDateSubmit}
              disabled={!customStartDate || !customEndDate}
            >
              Apply Custom Dates
            </button>
          </div>
          {useCustomDates && customStartDate && customEndDate && (
            <div className="active-date-range">
              📅 Showing: {customStartDate} to {customEndDate}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading historical data...</div>
      ) : performanceData ? (
        <div className="strategy-detail-container">
          <div className="strategy-performance-card large">
            <div className="strategy-header">
              <h3>{performanceData.strategy}</h3>
              <div className={`strategy-action ${performanceData.action?.toLowerCase()}`}>
                {performanceData.action}
              </div>
            </div>

            {formatChartData(performanceData) && (
              <div className="chart-container-large">
                <Line data={formatChartData(performanceData)} options={chartOptions} />
              </div>
            )}

            <div className="strategy-metrics">
              <div className="metric">
                <span className="metric-label">Strategy Return</span>
                <span className="metric-value positive">
                  {performanceData.total_return_pct?.toFixed(2)}%
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Buy & Hold Return</span>
                <span className="metric-value">
                  {performanceData.buy_hold_return_pct?.toFixed(2)}%
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Sharpe Ratio</span>
                <span className="metric-value">
                  {performanceData.sharpe_ratio?.toFixed(2)}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Max Drawdown</span>
                <span className="metric-value negative">
                  {performanceData.max_drawdown_pct?.toFixed(2)}%
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Win Rate</span>
                <span className="metric-value">
                  {performanceData.win_rate_pct?.toFixed(1)}%
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Total Trades</span>
                <span className="metric-value">{performanceData.total_trades}</span>
              </div>
            </div>

            <div className="vs-buyhold">
              <span>Outperformance vs Buy & Hold: </span>
              <span className={`comparison ${performanceData.excess_return_pct >= 0 ? 'positive' : 'negative'}`}>
                {performanceData.excess_return_pct >= 0 ? '+' : ''}{performanceData.excess_return_pct?.toFixed(2)}%
              </span>
            </div>

            <button 
              className="expand-details-btn"
              onClick={() => setExpandedStrategy(expandedStrategy === 'main' ? null : 'main')}
            >
              {expandedStrategy === 'main' ? '▼ Hide Details' : '▶ Show More Details'}
            </button>

            {expandedStrategy === 'main' && (
              <div className="expanded-details">
                  <div className="detail-section">
                  <h4>📊 Performance Metrics</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span>Initial Value:</span>
                      <span>${performanceData.initial_capital?.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span>Final Value:</span>
                      <span className="positive">${performanceData.final_value?.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span>Profit:</span>
                      <span className="positive">
                        ${(performanceData.final_value - performanceData.initial_capital).toLocaleString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span>Winning Trades:</span>
                      <span>{performanceData.winning_trades}</span>
                    </div>
                    <div className="detail-item">
                      <span>Losing Trades:</span>
                      <span>{performanceData.losing_trades}</span>
                    </div>
                    <div className="detail-item">
                      <span>Avg Win:</span>
                      <span className="positive">{performanceData.avg_win?.toFixed(2)}%</span>
                    </div>
                    <div className="detail-item">
                      <span>Avg Loss:</span>
                      <span className="negative">{performanceData.avg_loss?.toFixed(2)}%</span>
                    </div>
                    <div className="detail-item">
                      <span>Taxes Paid:</span>
                      <span className="negative">${performanceData.total_taxes_paid?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>💰 Buy & Hold Comparison</h4>
                  <div className="comparison-table">
                    <div className="comparison-row">
                      <span>Strategy Final Value:</span>
                      <span className="positive">${performanceData.final_value?.toLocaleString()}</span>
                    </div>
                    <div className="comparison-row">
                      <span>Buy & Hold Final Value:</span>
                      <span>${performanceData.buy_hold_final_value?.toLocaleString()}</span>
                    </div>
                    <div className="comparison-row">
                      <span>Strategy Taxes Paid:</span>
                      <span className="negative">${performanceData.total_taxes_paid?.toLocaleString()}</span>
                    </div>
                    <div className="comparison-row">
                      <span>Buy & Hold Taxes Paid:</span>
                      <span className="negative">${performanceData.buy_hold_taxes_paid?.toLocaleString()}</span>
                    </div>
                    <div className="comparison-row highlight">
                      <span>Extra Profit (After Tax):</span>
                      <span className={performanceData.final_value > performanceData.buy_hold_final_value ? 'positive' : 'negative'}>
                        ${((performanceData.final_value || 0) - (performanceData.buy_hold_final_value || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {performanceData.trades && performanceData.trades.length > 0 && (
                  <div className="detail-section">
                    <h4>📝 Recent Trades (Last 20)</h4>
                    <div className="trades-table">
                      <div className="trade-row trade-header">
                        <span>Action</span>
                        <span>Entry Date</span>
                        <span>Entry Price</span>
                        <span>Exit Date</span>
                        <span>Exit Price</span>
                        <span>P&L %</span>
                      </div>
                      {performanceData.trades.map((trade, idx) => (
                        <div key={idx} className="trade-row">
                          <span className="trade-action buy">
                            {trade.is_closed ? 'BUY/SELL' : 'OPEN'}
                          </span>
                          <span>{trade.entry_date}</span>
                          <span>${trade.entry_price?.toFixed(2)}</span>
                          <span>{trade.exit_date || '-'}</span>
                          <span>{trade.exit_price ? `$${trade.exit_price.toFixed(2)}` : '-'}</span>
                          <span className={trade.profit_loss_pct >= 0 ? 'positive' : 'negative'}>
                            {trade.profit_loss_pct !== null && trade.profit_loss_pct !== undefined
                              ? `${trade.profit_loss_pct >= 0 ? '+' : ''}${trade.profit_loss_pct.toFixed(2)}%`
                              : '-'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-data">
          No performance data available for {selectedTicker} in the selected time period.
          <br />
          Try selecting a different time range or ticker.
        </div>
      )}
    </div>
  );
};

export default HistoricalPerformance;
