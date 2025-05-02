import React from 'react';

const Header = ({ toggleSidebar, title, isDarkMode }) => {
  // เพิ่มคลาสสำหรับ Dark Mode
  const bgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-800';
  
  return (
    <header className={`${bgClass} shadow`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h1 className={`text-xl font-bold ${textClass}`}>
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;