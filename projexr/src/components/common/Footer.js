import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <p className="text-[#6e717c] text-base font-normal leading-normal">
            © {new Date().getFullYear()} ProjexAI. All rights reserved.
          </p>
        </footer>
      </div>
    </footer>
  );
};

export default Footer; 