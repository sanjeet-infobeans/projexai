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

  const login = async (username, password, keepLoggedIn = false) => {
    try {
      const res = await fetch('https://capitalmitra.com/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.token) {
        setIsAuthenticated(true);
        setUser({ username, token: data.token, user_role: data.user_role, display_name: data.display_name, user_email: data.user_email });
        localStorage.setItem('token', data.token);
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('projexai_user');
    localStorage.removeItem('projexai_auth');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};