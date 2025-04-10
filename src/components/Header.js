import React from 'react';

const Header = ({ setSidebarOpen, activeMenu, menuItems }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h1 className="text-xl font-bold">
          {menuItems.find(item => item.id === activeMenu)?.name || 'แดชบอร์ด'}
        </h1>
      </div>
    </header>
  );
};

export default Header;