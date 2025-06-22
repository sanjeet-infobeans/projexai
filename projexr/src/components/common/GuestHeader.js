import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../projectai-logo.png';

const GuestHeader = () => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8eaf2] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0f111a]">
        <Link to="/">
          <img src={logo} alt="ProjexAI Logo" style={{ width: 120, height: 'auto' }} />
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link 
            className={`text-[#0f111a] text-sm font-medium leading-normal ${location.pathname === '/' ? 'text-blue-600' : ''}`}
            to="/"
          >
            Home
          </Link>
          <Link 
            className={`text-[#0f111a] text-sm font-medium leading-normal ${location.pathname === '/about' ? 'text-blue-600' : ''}`}
            to="/about"
          >
            About
          </Link>
          <Link 
            className={`text-[#0f111a] text-sm font-medium leading-normal ${location.pathname === '/resource' ? 'text-blue-600' : ''}`}
            to="/resource"
          >
            Resource
          </Link>
          <Link 
            className={`text-[#0f111a] text-sm font-medium leading-normal ${location.pathname === '/team' ? 'text-blue-600' : ''}`}
            to="/team"
          >
            Team
          </Link>
        </div>
        <div className="flex gap-2">
          <Link 
            to="/login" 
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267d] text-[#f8f9fb] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default GuestHeader; 