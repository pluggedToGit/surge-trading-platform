// Environment-based API configuration
// Automatically detects if running locally or on GitHub Pages

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Local development uses Flask backend on localhost:5000
// Production (GitHub Pages) uses AWS API Gateway
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000'  // Local Flask API
  : 'https://xsu0i40cv8.execute-api.us-east-1.amazonaws.com/prod';  // AWS API Gateway

console.log(`🌐 API Mode: ${isDevelopment ? 'LOCAL' : 'PRODUCTION'}`);
console.log(`📡 API Endpoint: ${API_BASE_URL}`);

export default API_BASE_URL;
