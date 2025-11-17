import React, { useState, useEffect } from 'react';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiUrl] = useState('http://127.0.0.1:5454');
  
  // Trade form state
  const [tradeForm, setTradeForm] = useState({
    ticker: '',
    action: 'BUY',
    shares: '',
    price: '',
    strategy: ''
  });
  const [tradeStatus, setTradeStatus] = useState(null);

  useEffect(() => {
    loadPortfolio();
    loadTradeHistory();
  }, []);

  const loadPortfolio = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/portfolio`);
      const data = await response.json();
      setPortfolio(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading portfolio:', err);
      setError('Failed to load portfolio');
      setLoading(false);
    }
  };

  const loadTradeHistory = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/portfolio/trades?limit=20`);
      const data = await response.json();
      setTradeHistory(data.trades || []);
    } catch (err) {
      console.error('Error loading trade history:', err);
    }
  };

  const handleTradeSubmit = async (e) => {
    e.preventDefault();
    setTradeStatus({ type: 'loading', message: 'Executing trade...' });

    try {
      const response = await fetch(`${apiUrl}/api/portfolio/trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: tradeForm.ticker.toUpperCase(),
          action: tradeForm.action,
          shares: parseFloat(tradeForm.shares),
          price: parseFloat(tradeForm.price),
          strategy: tradeForm.strategy || 'Manual'
        })
      });

      const data = await response.json();

      if (data.success) {
        setTradeStatus({ type: 'success', message: `✓ Trade executed: ${data.trade_id}` });
        setTradeForm({ ticker: '', action: 'BUY', shares: '', price: '', strategy: '' });
        // Reload portfolio and history
        loadPortfolio();
        loadTradeHistory();
        
        // Clear success message after 3 seconds
        setTimeout(() => setTradeStatus(null), 3000);
      } else {
        setTradeStatus({ type: 'error', message: `✗ Error: ${data.error}` });
      }
    } catch (err) {
      setTradeStatus({ type: 'error', message: `✗ Error: ${err.message}` });
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="portfolio-page">
        <div className="loading">Loading portfolio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  const totalInvested = portfolio ? Object.values(portfolio.positions).reduce(
    (sum, pos) => sum + (pos.shares * pos.avg_cost), 0
  ) : 0;

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1>💼 Portfolio Dashboard</h1>
        <p className="subtitle">Track your positions and execute trades</p>
      </div>

      {/* Portfolio Overview */}
      <div className="portfolio-overview">
        <div className="overview-card total">
          <div className="card-header">
            <span className="card-icon">💰</span>
            <span className="card-label">Total Value</span>
          </div>
          <div className="card-value">{formatCurrency(portfolio?.total_value || 0)}</div>
        </div>

        <div className="overview-card cash">
          <div className="card-header">
            <span className="card-icon">💵</span>
            <span className="card-label">Cash Available</span>
          </div>
          <div className="card-value">{formatCurrency(portfolio?.cash || 0)}</div>
          <div className="card-subtitle">
            {((portfolio?.cash / portfolio?.total_value) * 100).toFixed(1)}% of portfolio
          </div>
        </div>

        <div className="overview-card invested">
          <div className="card-header">
            <span className="card-icon">📈</span>
            <span className="card-label">Invested</span>
          </div>
          <div className="card-value">{formatCurrency(totalInvested)}</div>
          <div className="card-subtitle">
            {((totalInvested / portfolio?.total_value) * 100).toFixed(1)}% of portfolio
          </div>
        </div>

        <div className="overview-card positions">
          <div className="card-header">
            <span className="card-icon">🎯</span>
            <span className="card-label">Positions</span>
          </div>
          <div className="card-value">{Object.keys(portfolio?.positions || {}).length}</div>
          <div className="card-subtitle">Active holdings</div>
        </div>
      </div>

      {/* Current Positions */}
      <div className="positions-section">
        <h2>📊 Current Positions</h2>
        {Object.keys(portfolio?.positions || {}).length === 0 ? (
          <div className="empty-state">
            <p>No positions yet. Execute your first trade below!</p>
          </div>
        ) : (
          <div className="positions-table">
            <table>
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Shares</th>
                  <th>Avg Cost</th>
                  <th>Current Value</th>
                  <th>% of Portfolio</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(portfolio?.positions || {}).map(([ticker, pos]) => {
                  const value = pos.shares * pos.avg_cost;
                  const percentage = (value / portfolio.total_value) * 100;
                  return (
                    <tr key={ticker}>
                      <td className="ticker-cell">{ticker}</td>
                      <td>{pos.shares.toFixed(2)}</td>
                      <td>{formatCurrency(pos.avg_cost)}</td>
                      <td>{formatCurrency(value)}</td>
                      <td>
                        <div className="percentage-bar">
                          <div 
                            className="percentage-fill" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                          <span className="percentage-text">{percentage.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Trade Execution Form */}
      <div className="trade-section">
        <h2>💱 Execute Trade</h2>
        <form className="trade-form" onSubmit={handleTradeSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Ticker</label>
              <input
                type="text"
                value={tradeForm.ticker}
                onChange={(e) => setTradeForm({...tradeForm, ticker: e.target.value.toUpperCase()})}
                placeholder="TQQQ"
                required
              />
            </div>

            <div className="form-group">
              <label>Action</label>
              <select
                value={tradeForm.action}
                onChange={(e) => setTradeForm({...tradeForm, action: e.target.value})}
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>

            <div className="form-group">
              <label>Shares</label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.shares}
                onChange={(e) => setTradeForm({...tradeForm, shares: e.target.value})}
                placeholder="286"
                required
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.price}
                onChange={(e) => setTradeForm({...tradeForm, price: e.target.value})}
                placeholder="104.66"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Strategy (optional)</label>
              <input
                type="text"
                value={tradeForm.strategy}
                onChange={(e) => setTradeForm({...tradeForm, strategy: e.target.value})}
                placeholder="BUY & HOLD, MACD_12_26_9, etc."
              />
            </div>
          </div>

          {tradeStatus && (
            <div className={`trade-status ${tradeStatus.type}`}>
              {tradeStatus.message}
            </div>
          )}

          <button type="submit" className="submit-btn">
            Execute Trade
          </button>
        </form>
      </div>

      {/* Trade History */}
      <div className="history-section">
        <h2>📜 Trade History</h2>
        {tradeHistory.length === 0 ? (
          <div className="empty-state">
            <p>No trades yet.</p>
          </div>
        ) : (
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Action</th>
                  <th>Ticker</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Strategy</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade) => (
                  <tr key={trade.trade_id}>
                    <td className="date-cell">{formatDate(trade.executed_date)}</td>
                    <td>
                      <span className={`action-badge ${trade.action.toLowerCase()}`}>
                        {trade.action}
                      </span>
                    </td>
                    <td className="ticker-cell">{trade.ticker}</td>
                    <td>{trade.shares.toFixed(2)}</td>
                    <td>{formatCurrency(trade.price)}</td>
                    <td>{formatCurrency(trade.total_value)}</td>
                    <td className="strategy-cell">{trade.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {portfolio && (
        <div className="last-updated">
          Last updated: {new Date(portfolio.last_updated).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
