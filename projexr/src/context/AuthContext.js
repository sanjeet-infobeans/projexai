import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Sample users with roles
const sampleUsers = [
  {
    username: 'admin', password: 'password', name: 'Sanjeet', email: 'admin@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', role: 'Manager'
  },
  {
    username: 'sales1', password: 'password', name: 'Priya Sharma', email: 'priya.sales@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', role: 'Sales'
  },
  {
    username: 'sales2', password: 'password', name: 'Rahul Verma', email: 'rahul.sales@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg', role: 'Sales'
  },
  {
    username: 'tech1', password: 'password', name: 'Amit Kumar', email: 'amit.tech@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg', role: 'Technical'
  },
  {
    username: 'tech2', password: 'password', name: 'Neha Gupta', email: 'neha.tech@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg', role: 'Technical'
  },
  {
    username: 'manager1', password: 'password', name: 'Vikram Singh', email: 'vikram.manager@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg', role: 'Manager'
  },
  {
    username: 'manager2', password: 'password', name: 'Anjali Mehra', email: 'anjali.manager@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg', role: 'Manager'
  },
  {
    username: 'analyst1', password: 'password', name: 'Deepak Joshi', email: 'deepak.analyst@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg', role: 'Analyst'
  },
  {
    username: 'analyst2', password: 'password', name: 'Sneha Rao', email: 'sneha.analyst@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg', role: 'Analyst'
  },
  {
    username: 'tech3', password: 'password', name: 'Rohit Jain', email: 'rohit.tech@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg', role: 'Technical'
  }
];

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
    // Check against sample users
    const foundUser = sampleUsers.find(
      u => u.username === username && u.password === password
    );
    if (foundUser) {
      const userData = { ...foundUser };
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