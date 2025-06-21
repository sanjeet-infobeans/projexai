import React from 'react';
import { Link } from 'react-router-dom';

const GuestFooter = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a className="text-[#6e717c] text-base font-normal leading-normal min-w-40" href="/">
              Home
            </a>
            <a className="text-[#6e717c] text-base font-normal leading-normal min-w-40" href="/about">
              About
            </a>
            <Link 
              to="/login" 
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267d] text-[#f8f9fb] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Login</span>
            </Link>
            <a className="text-[#6e717c] text-base font-normal leading-normal min-w-40" href="/resources">
              Resources
            </a>
            <a className="text-[#6e717c] text-base font-normal leading-normal min-w-40" href="/teams">
              Team
            </a>
          </div>
          <p className="text-[#6e717c] text-base font-normal leading-normal">
            © {new Date().getFullYear()} ProjexAI. All rights reserved.
          </p>
        </footer>
      </div>
    </footer>
  );
};

export default GuestFooter; 