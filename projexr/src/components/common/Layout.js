import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from './Header';
import GuestHeader from './GuestHeader';
import Footer from './Footer';
import GuestFooter from './GuestFooter';

const Layout = ({ children, showFooter = true }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {isAuthenticated ? <Header /> : <GuestHeader />}
        <main className="flex-1">
          {children}
        </main>
        {showFooter && (isAuthenticated ? <Footer /> : <GuestFooter />)}
      </div>
    </div>
  );
};

export default Layout; 