import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * TwoColLayout - A two-column layout with a sidebar and main content area.
 *
 * Props:
 *   leftContent: ReactNode - Content for the left sidebar
 *   rightContent: ReactNode - Content for the right/main area
 *   className: string (optional) - Additional classes for the main wrapper
 */
const TwoColLayout = ({ leftContent, rightContent, className = '' }) => {
  return (
    <>
      <Header />
      <div className={`gap-1 px-6 flex flex-1 justify-center py-5 ${className}`}>
        {/* Sidebar/Left Column */}
        <div className="layout-content-container flex flex-col w-80">
          <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
            {leftContent}
          </div>
        </div>
        {/* Main/Right Column */}
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {rightContent}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TwoColLayout; 