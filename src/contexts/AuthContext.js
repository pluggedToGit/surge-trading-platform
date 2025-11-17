import React, { createContext, useContext, useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, getCurrentUser, fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';
import awsConfig from '../aws-config';

// Configure Amplify only if valid config exists
const isConfigured = awsConfig.Auth?.Cognito?.userPoolId && !awsConfig.Auth.Cognito.userPoolId.includes('XXXX');
if (isConfigured) {
  Amplify.configure(awsConfig);
}

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Skip auth check if Cognito not configured yet
      if (!isConfigured) {
        console.log('Cognito not configured yet - skipping auth check');
        setUser(null);
        setLoading(false);
        return;
      }
      
      const currentUser = await getCurrentUser();
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken;
      
      // Extract user ID from token (this is the 'sub' claim - unique user identifier)
      const userId = idToken?.payload.sub || currentUser.userId;
      
      const userData = {
        userId: userId,  // This is the Cognito 'sub' - unique UUID for this user
        email: idToken?.payload.email,
        name: idToken?.payload.name || idToken?.payload.email,
        token: idToken?.toString(),
      };
      
      console.log('✅ User authenticated:', {
        userId: userData.userId,
        email: userData.email,
        name: userData.name,
      });
      
      setUser(userData);
    } catch (err) {
      console.log('Not authenticated:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      if (!isConfigured) {
        setError('Google Sign-In not configured yet. Please deploy the backend first.');
        alert('Google Sign-In requires backend deployment.\n\nPlease follow these steps:\n1. Get Google OAuth credentials\n2. Update template.yaml with credentials\n3. Deploy backend: ./deploy.sh\n4. Configure aws-config.js with Cognito values');
        return;
      }
      
      setLoading(true);
      setError(null);
      await signInWithRedirect({ provider: 'Google' });
    } catch (err) {
      console.error('Error signing in with Google:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Sign in with email/password (for future use)
  const signInWithEmail = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      await signIn({ username, password });
      await checkUser();
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email/password (for future use)
  const signUpWithEmail = async (username, password, name) => {
    try {
      setLoading(true);
      setError(null);
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email: username,
            name,
          },
        },
      });
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      setUser(null);
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get current user's ID token for API calls
  const getToken = async () => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.idToken?.toString();
    } catch (err) {
      console.error('Error getting token:', err);
      return null;
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signIn: signInWithEmail,
    signUp: signUpWithEmail,
    signOut: handleSignOut,
    getToken,
    checkUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
