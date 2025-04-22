"use client"

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import SearchBar from './SearchBar';
import BranchCard from './BranchCard';

const BranchInfoCardApp = () => {
  // State สำหรับการค้นหา
  const [searchTerm, setSearchTerm] = useState('');
  // State สำหรับเมนูที่เลือก
  const [activeMenu, setActiveMenu] = useState('branches');
  // State สำหรับการแสดง/ซ่อน sidebar บนมือถือ
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State สำหรับเก็บข้อมูลจาก API
  const [branchesData, setBranchesData] = useState([]);
  const [deliyaData, setDeliyaData] = useState([]);
  const [sabotenData, setSabotenData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL ของ backend API (ปรับให้ตรงกับที่คุณใช้)
  const API_URL = 'http://localhost:3000/api';

  // ฟังก์ชันสำหรับดึงข้อมูลจาก API
  const fetchData = async (endpoint, setStateFunction) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`ไม่สามารถดึงข้อมูล ${endpoint} ได้`);
      }
      const data = await response.json();
      setStateFunction(data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      setError(error.message);
    }
  };

  // ดึงข้อมูลตอนโหลดคอมโพเนนต์ครั้งแรก
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchData('branches', setBranchesData),
          fetchData('deliya', setDeliyaData),
          fetchData('saboten', setSabotenData),
          fetchData('menu', setMenuItems)
        ]);
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

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

  // ฟังก์ชันสำหรับการเพิ่มข้อมูลใหม่
  const addItem = async (newItem) => {
    try {
      const response = await fetch(`${API_URL}/${activeMenu}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      
      if (!response.ok) {
        throw new Error('ไม่สามารถเพิ่มข้อมูลได้');
      }
      
      // ดึงข้อมูลใหม่หลังจากเพิ่มสำเร็จ
      fetchData(activeMenu, 
        activeMenu === 'branches' ? setBranchesData :
        activeMenu === 'deliya' ? setDeliyaData :
        setSabotenData
      );
      
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.message);
    }
  };

  // ฟังก์ชันสำหรับการอัปเดตข้อมูล
  const updateItem = async (id, updatedItem) => {
    try {
      const response = await fetch(`${API_URL}/${activeMenu}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      
      if (!response.ok) {
        throw new Error('ไม่สามารถอัปเดตข้อมูลได้');
      }
      
      // ดึงข้อมูลใหม่หลังจากอัปเดตสำเร็จ
      fetchData(activeMenu, 
        activeMenu === 'branches' ? setBranchesData :
        activeMenu === 'deliya' ? setDeliyaData :
        setSabotenData
      );
      
    } catch (error) {
      console.error('Error updating item:', error);
      setError(error.message);
    }
  };

  // ฟังก์ชันสำหรับการลบข้อมูล
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${activeMenu}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('ไม่สามารถลบข้อมูลได้');
      }
      
      // ดึงข้อมูลใหม่หลังจากลบสำเร็จ
      fetchData(activeMenu, 
        activeMenu === 'branches' ? setBranchesData :
        activeMenu === 'deliya' ? setDeliyaData :
        setSabotenData
      );
      
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error.message);
    }
  };

  // ฟังก์ชันสำหรับแสดงเนื้อหาตามเมนูที่เลือก
  const renderContent = () => {
    // แสดง loading state
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    // แสดงข้อความ error
    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" 
            onClick={() => window.location.reload()}
          >
            ลองใหม่
          </button>
        </div>
      );
    }

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
            
            {/* ปุ่มเพิ่มข้อมูลใหม่ */}
            <div className="mb-4">
              <button 
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => {/* แสดง modal หรือ form เพิ่มข้อมูล */}}
              >
                เพิ่มข้อมูลใหม่
              </button>
            </div>
            
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
            onUpdate={(updatedItem) => updateItem(item.id, updatedItem)}
            onDelete={() => deleteItem(item.id)}
            cardType={activeMenu} // ส่งชนิดของการ์ดไปด้วย
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

      {menuItems.length > 0 && (
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          menuItems={menuItems} 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
          setSidebarOpen={setSidebarOpen} 
        />
      )}

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