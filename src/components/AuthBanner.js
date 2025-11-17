import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AuthBanner.css';

const AuthBanner = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="auth-banner auth-banner-success">
        <div className="banner-content">
          <span className="banner-icon">✅</span>
          <div className="banner-text">
            <strong>Welcome back, {user.name || user.email}!</strong>
            <p>You're logged in and ready to trade.</p>
          </div>
          <Link to="/portfolio" className="banner-btn">
            View Portfolio →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-banner auth-banner-info">
      <div className="banner-content">
        <span className="banner-icon">🔐</span>
        <div className="banner-text">
          <strong>Sign in to access personalized features</strong>
          <p>Track your portfolio, execute trades, and get customized recommendations.</p>
        </div>
        <Link to="/login" className="banner-btn">
          Sign In Now →
        </Link>
      </div>
    </div>
  );
};

export default AuthBanner;
