"use client"

import React from 'react';

const Sidebar = ({ sidebarOpen, menuItems, activeMenu, setActiveMenu, setSidebarOpen, isDarkMode }) => {
  // Dark mode styling
  const bgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-700';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const activeClass = isDarkMode 
    ? 'bg-blue-800 text-white' 
    : 'bg-blue-100 text-blue-700';
  const hoverClass = isDarkMode 
    ? 'hover:bg-gray-700' 
    : 'hover:bg-gray-100';

  return (
    <div className={`fixed inset-y-0 left-0 w-64 ${bgClass} shadow-lg z-50 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className={`p-4 border-b ${borderClass}`}>
        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Branch Info
        </h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center p-2 rounded-lg ${
                  activeMenu === item.id 
                    ? activeClass 
                    : `${textClass} ${hoverClass}`
                }`}
                onClick={() => {
                  setActiveMenu(item.id);
                  setSidebarOpen(false);
                }}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;