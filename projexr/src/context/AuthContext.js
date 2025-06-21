import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing authentication on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('projexai_user');
    const savedAuth = localStorage.getItem('projexai_auth');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password, keepLoggedIn = false) => {
    // Simple authentication check
    if (username === 'admin' && password === 'password') {
      const userData = { 
        username, 
        email: 'admin@example.com',
        name: 'Sanjeet',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhMqy4azEr8zqKaJBxVz6XaWdwxbUz9V8SZO-Gbe_BRMbfzfb5OMDECCM3lZdnuYXDTj1Leq-bySDVyFzLc5kDRnabVpnpeJgC_C-rMYJ0vU9T41F9nMpaJtp_nx7hBKNJiAWbfa8WeU9wIT0CmirN7pCJ8WlIIPwEMZed2_PaNkQ_vViMwGMNnclQNaR2TZjYCrGp-2qNMhbkO-jvkgIXaMpmgjBudIpFoQCzEKpQ_Y53016_0jlabmSjJMlOjeR3BScaxcskoW8'
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      
      if (keepLoggedIn) {
        localStorage.setItem('projexai_user', JSON.stringify(userData));
        localStorage.setItem('projexai_auth', 'true');
      }
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('projexai_user');
    localStorage.removeItem('projexai_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};