"use client"

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import SearchBar from './SearchBar';
import BranchCard from './BranchCard';
import { branchesData, deliyaData, sabotenData, menuItems } from '../data/branchData';

const BranchInfoCardApp = () => {
  // State สำหรับการค้นหา
  const [searchTerm, setSearchTerm] = useState('');
  // State สำหรับเมนูที่เลือก
  const [activeMenu, setActiveMenu] = useState('branches');
  // State สำหรับการแสดง/ซ่อน sidebar บนมือถือ
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ฟังก์ชันสำหรับเลือกข้อมูลที่จะแสดงตามเมนูที่เลือก
  const getDataForActiveMenu = () => {
    switch(activeMenu) {
      case 'branches':
        return branchesData;
      case 'deliya':
        return deliyaData;
      case 'saboten':
        return sabotenData;
      default:
        return [];
    }
  };

  // กรองข้อมูลตามคำค้นหา
  const filteredData = getDataForActiveMenu().filter(item => {
    return Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // กำหนดสีส่วนหัวของการ์ดตามประเภทข้อมูล
  const getHeaderColorClass = () => {
    switch(activeMenu) {
      case 'branches':
        return 'bg-blue-500';
      case 'deliya':
        return 'bg-amber-600';
      case 'saboten':
        return 'bg-green-600';
      default:
        return 'bg-blue-500';
    }
  };

  // ฟังก์ชันสำหรับแสดงเนื้อหาตามเมนูที่เลือก
  const renderContent = () => {
    switch(activeMenu) {
      case 'branches':
      case 'deliya':
      case 'saboten':
        return (
          <>
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              activeMenu={activeMenu} 
            />
            
            {renderCards(filteredData)}
          </>
        );
      case 'dashboard':
        return (
          <Dashboard 
            branchesCount={branchesData.length} 
            deliyaCount={deliyaData.length} 
            sabotenCount={sabotenData.length} 
          />
        );
      default:
        return null;
    }
  };

  // ฟังก์ชันสำหรับแสดงการ์ดข้อมูล
  const renderCards = (data) => {
    if (data.length === 0) {
      return (
        <div className="py-8 text-center text-gray-500">
          ไม่พบข้อมูลที่ตรงกับการค้นหา
        </div>
      );
    }
    
    return (
      <div className="flex flex-col gap-4">
        {data.map(item => (
          <BranchCard 
            key={item.id} 
            item={item} 
            headerColorClass={getHeaderColorClass()} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay for mobile sidebar */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${sidebarOpen ? 'block' : 'hidden'}`} 
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar 
        sidebarOpen={sidebarOpen} 
        menuItems={menuItems} 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* ส่วนของเนื้อหาหลัก */}
      <div className="md:ml-64">
        <Header 
          setSidebarOpen={setSidebarOpen} 
          activeMenu={activeMenu} 
          menuItems={menuItems} 
        />

        {/* เนื้อหา */}
        <main className="p-4 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default BranchInfoCardApp;