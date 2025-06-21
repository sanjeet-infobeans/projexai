import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/common/Layout';
import LoginPage from './components/LoginPage';
import ListPage from './components/ListPage';
import ClientDetailPage from './components/ClientDetailPage';
import Home from './components/Home';
import About from './components/About';
import Team from './components/Team';
import Resource from './components/Resource';
import Profile from './components/Profile';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/clients" replace />;
};

const AppContent = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public static pages with guest layout */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Home />
            </Layout>
          } 
        />
        
        <Route 
          path="/about" 
          element={
            <Layout>
              <About />
            </Layout>
          } 
        />
        
        <Route 
          path="/team" 
          element={
            <Layout>
              <Team />
            </Layout>
          } 
        />
        
        <Route 
          path="/resource" 
          element={
            <Layout>
              <Resource />
            </Layout>
          } 
        />
        
        {/* Login page */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/clients" 
          element={
            <ProtectedRoute>
              <ListPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/client/:id" 
          element={
            <ProtectedRoute>
              <ClientDetailPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;