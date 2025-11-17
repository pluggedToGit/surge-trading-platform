// API utility functions for making authenticated requests
import { fetchAuthSession } from 'aws-amplify/auth';
import { API_BASE_URL } from '../config/api-config';

/**
 * Get the current user's JWT token
 */
export const getAuthToken = async () => {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString();
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Make an authenticated API request
 * The Lambda function will automatically extract the user_id from the JWT token
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token available');
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // JWT token with user's sub claim
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} ${errorText}`);
  }

  return response.json();
};

// Convenience methods for common HTTP verbs
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

// Portfolio API endpoints
export const portfolioAPI = {
  // Get user's portfolio (user_id extracted from JWT token)
  getPortfolio: () => api.get('/api/portfolio'),
  
  // Get user's trade history (user_id extracted from JWT token)
  getTrades: () => api.get('/api/trades'),
  
  // Execute a trade
  executeTrade: (tradeData) => api.post('/api/trade', tradeData),
  
  // Get recommendations (can be personalized based on user_id)
  getRecommendations: (params) => api.post('/api/recommendations', params),
  
  // Get strategies
  getStrategies: () => api.get('/api/strategies'),
  
  // Get backtest results
  getBacktest: (strategyId) => api.get(`/api/backtest/${strategyId}`),
};
