import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../projectai-logo.png';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#121416]">
        <div className="size-4">
          <Link to="/clients">
            <img src={logo} alt="ProjexAI Logo" className="w-4 h-4" />
          </Link>
        </div>
        <h2 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em]">
          <Link to="/clients">ProjexAI</Link>
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link 
            className={`text-[#121416] text-sm font-medium leading-normal ${location.pathname === '/clients' ? 'text-blue-600' : ''}`}
            to="/clients"
          >
            Dashboard
          </Link>
          <Link 
            className={`text-[#121416] text-sm font-medium leading-normal ${location.pathname === '/projects' ? 'text-blue-600' : ''}`}
            to="/projects"
          >
            Projects
          </Link>
          <Link 
            className={`text-[#121416] text-sm font-medium leading-normal ${location.pathname === '/clients' ? 'text-blue-600' : ''}`}
            to="/clients"
          >
            Clients
          </Link>
          <Link 
            className={`text-[#121416] text-sm font-medium leading-normal ${location.pathname === '/teams' ? 'text-blue-600' : ''}`}
            to="/teams"
          >
            Team
          </Link>
        </div>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={logout}
        >
          <span className="truncate">Welcome back, {user?.name || user?.username || 'User'}</span>
          {user?.role && (
            <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold uppercase">{user.role}</span>
          )}
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
            style={{
              backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhMqy4azEr8zqKaJBxVz6XaWdwxbUz9V8SZO-Gbe_BRMbfzfb5OMDECCM3lZdnuYXDTj1Leq-bySDVyFzLc5kDRnabVpnpeJgC_C-rMYJ0vU9T41F9nMpaJtp_nx7hBKNJiAWbfa8WeU9wIT0CmirN7pCJ8WlIIPwEMZed2_PaNkQ_vViMwGMNnclQNaR2TZjYCrGp-2qNMhbkO-jvkgIXaMpmgjBudIpFoQCzEKpQ_Y53016_0jlabmSjJMlOjeR3BScaxcskoW8'}")`
            }}
            onClick={() => setShowDropdown(!showDropdown)}
            title="User menu"
          />
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <button
                onClick={handleProfileClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 