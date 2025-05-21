"use client"

import React from 'react';

const Dashboard = ({ branchesCount, deliyaCount, sabotenCount, isDarkMode }) => {
  const totalCount = branchesCount + deliyaCount + sabotenCount;
  
  // Define dark mode styling
  const containerClass = isDarkMode 
    ? 'bg-gray-800 text-white' 
    : 'bg-white text-gray-800';
  
  const cardClasses = {
    branches: isDarkMode ? 'bg-blue-900' : 'bg-blue-100',
    deliya: isDarkMode ? 'bg-amber-900' : 'bg-amber-100',
    saboten: isDarkMode ? 'bg-green-900' : 'bg-green-100',
    total: isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
  };
  
  const textClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const titleClass = isDarkMode ? 'text-white' : 'text-gray-800';
  const statsClass = isDarkMode ? 'text-white' : 'text-gray-800';
  
  return (
    <div className={`${containerClass} rounded-lg shadow-md p-6`}>
      <h2 className={`text-xl font-bold mb-4 ${titleClass}`}>แดชบอร์ด</h2>
      <p className={textClass}>แสดงภาพรวมของข้อมูลสาขาและสถิติที่สำคัญ</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className={`${cardClasses.branches} p-4 rounded-lg`}>
          <h3 className={`font-semibold ${statsClass}`}>สาขาทั่วไป</h3>
          <p className={`text-2xl font-bold mt-2 ${statsClass}`}>{branchesCount}</p>
        </div>
        
        <div className={`${cardClasses.deliya} p-4 rounded-lg`}>
          <h3 className={`font-semibold ${statsClass}`}>สาขา Deliya</h3>
          <p className={`text-2xl font-bold mt-2 ${statsClass}`}>{deliyaCount}</p>
        </div>
        
        <div className={`${cardClasses.saboten} p-4 rounded-lg`}>
          <h3 className={`font-semibold ${statsClass}`}>สาขา Saboten</h3>
          <p className={`text-2xl font-bold mt-2 ${statsClass}`}>{sabotenCount}</p>
        </div>
        
        <div className={`${cardClasses.total} p-4 rounded-lg`}>
          <h3 className={`font-semibold ${statsClass}`}>สาขาทั้งหมด</h3>
          <p className={`text-2xl font-bold mt-2 ${statsClass}`}>{totalCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;