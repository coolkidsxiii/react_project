"use client"

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import SearchBar from './SearchBar';
import BranchCard from './BranchCard';
import PasswordModal from './PasswordModal';

const BranchInfoCardApp = () => {
  // State สำหรับการค้นหา
  const [searchTerm, setSearchTerm] = useState('');
  // State สำหรับเมนูที่เลือก
  const [activeMenu, setActiveMenu] = useState('branches');
  // State สำหรับการแสดง/ซ่อน sidebar บนมือถือ
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State สำหรับ modal รหัสผ่าน
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordAction, setPasswordAction] = useState(null);
  
  // State สำหรับเก็บข้อมูลจาก API
  const [branchesData, setBranchesData] = useState([]);
  const [deliyaData, setDeliyaData] = useState([]);
  const [sabotenData, setSabotenData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State สำหรับ modal เพิ่มข้อมูลใหม่
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    id: '', 
    name: '', 
    phone: '', 
    manager: '', 
    managerPhone: '', 
    internetId: '', 
    address: ''
  });

  // URL ของ backend API (ปรับให้ตรงกับที่คุณใช้)
  const API_URL = 'http://localhost:3001/api';

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

  // ฟังก์ชันสำหรับเลือกข้อมูลที่จะแสดงตามเมนูที่เลือก และเรียงตามรหัส
const getDataForActiveMenu = () => {
  let data;
  switch(activeMenu) {
    case 'branches':
      data = [...branchesData];
      break;
    case 'deliya':
      data = [...deliyaData];
      break;
    case 'saboten':
      data = [...sabotenData];
      break;
    default:
      data = [];
  }
  
  // เรียงลำดับข้อมูลตามรหัส (ID)
  return data.sort((a, b) => {
    // แปลงรหัสเป็นตัวเลขเพื่อการเรียงลำดับที่ถูกต้อง
    // ตัดตัวอักษรออกและแปลงเป็นตัวเลข
    const idA = parseInt(a.id.replace(/\D/g, '') || '0');
    const idB = parseInt(b.id.replace(/\D/g, '') || '0');
    return idA - idB; // เรียงจากน้อยไปมาก
  });
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
  const addItem = async () => {
    try {
      // สร้าง ID สำหรับข้อมูลใหม่ (ในกรณีที่ API ไม่ได้สร้างให้)
      // ในระบบจริงอาจจะให้ backend สร้าง ID
      const currentData = getDataForActiveMenu();
      const maxId = Math.max(...currentData.map(item => parseInt(item.id.replace(/\D/g, '') || '0')), 0);
      
      //const idPrefix = activeMenu.charAt(0).toUpperCase();
      const newItemWithId = {
        ...newItem,
        //id: `${idPrefix}${(maxId + 1).toString().padStart(3, '0')}`
      };
      
      const response = await fetch(`${API_URL}/${activeMenu}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemWithId),
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
      
      // รีเซ็ทฟอร์ม
      setNewItem({
        id: '', 
        name: '', 
        phone: '', 
        manager: '', 
        managerPhone: '', 
        internetId: '', 
        address: ''
      });
      
      // ปิด modal
      setShowAddModal(false);
      
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.message);
    }
  };

  // ฟังก์ชันสำหรับการอัปเดตข้อมูล
  const updateItem = async (updatedItem) => {
    try {
      const response = await fetch(`${API_URL}/${activeMenu}/${updatedItem.id}`, {
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

  // ฟังก์ชันเปิด modal เพิ่มข้อมูลใหม่
  const handleAddButtonClick = () => {
    setPasswordAction('add');
    setShowPasswordModal(true);
  };

  // ฟังก์ชันเมื่อยืนยันรหัสผ่านสำเร็จ
  const handlePasswordConfirm = () => {
    if (passwordAction === 'add') {
      setShowAddModal(true);
    }
    // อื่นๆ จะถูกจัดการใน BranchCard component
  };

  // ฟังก์ชันจัดการเปลี่ยนแปลงข้อมูลในฟอร์มเพิ่มข้อมูลใหม่
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
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
                onClick={handleAddButtonClick}
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
            onUpdate={(updatedItem) => updateItem(updatedItem)}
            onDelete={() => deleteItem(item.id)}
            cardType={activeMenu}
          />
        ))}
      </div>
    );
  };

  // กำหนดหัวข้อตามประเภทของการ์ด
  const getManagerLabel = () => {
    switch (activeMenu) {
      case 'branches':
        return 'หัวหน้าสาขา';
      case 'deliya':
        return 'พนักงานหน้าร้าน';
      case 'saboten':
        return 'ผู้จัดการ';
      default:
        return 'ผู้จัดการ';
    }
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

      {/* Modal เพิ่มข้อมูลใหม่ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-4">
            <h2 className="text-xl font-bold mb-4">เพิ่มข้อมูลใหม่</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              addItem();
            }}>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* เพิ่มช่องรหัส (ID) ตรงนี้ */}
            <div>
            <label className="block text-sm font-medium text-gray-700">รหัส</label>
            <input
              type="text"
              name="id"
              value={newItem.id}
              onChange={handleNewItemChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ชื่อ{activeMenu === 'branches' ? 'สาขา' : 'ร้าน'}</label>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleNewItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                  <input
                    type="text"
                    name="phone"
                    value={newItem.phone}
                    onChange={handleNewItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{getManagerLabel()}</label>
                  <input
                    type="text"
                    name="manager"
                    value={newItem.manager}
                    onChange={handleNewItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">เบอร์{getManagerLabel()}</label>
                  <input
                    type="text"
                    name="managerPhone"
                    value={newItem.managerPhone}
                    onChange={handleNewItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">รหัสอินเตอร์เน็ต</label>
                  <input
                    type="text"
                    name="internetId"
                    value={newItem.internetId}
                    onChange={handleNewItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">ที่อยู่</label>
                  <textarea
                    name="address"
                    value={newItem.address}
                    onChange={handleNewItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    rows="2"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal ยืนยันรหัสผ่าน */}
      <PasswordModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirm}
        actionType={passwordAction}
      />
    </div>
  );
};

export default BranchInfoCardApp;