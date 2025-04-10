import React from 'react';

const Sidebar = ({ sidebarOpen, menuItems, activeMenu, setActiveMenu, setSidebarOpen }) => {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Branch Info</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center p-2 rounded-lg ${activeMenu === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
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