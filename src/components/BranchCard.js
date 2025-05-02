"use client"

import React, { useState, useEffect } from 'react';
import PasswordModal from './PasswordModal';

const BranchCard = ({ item, headerColorClass, onUpdate, onDelete, cardType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });
  const [showAddress, setShowAddress] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordAction, setPasswordAction] = useState(null); // 'edit' หรือ 'delete'
  // เพิ่ม state เพื่อตรวจสอบโหมดแสดงผล
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ตรวจสอบโหมดของเบราว์เซอร์เมื่อ component mount
  useEffect(() => {
    // ตรวจสอบว่าเบราว์เซอร์อยู่ในโหมดมืดหรือไม่
    const checkDarkMode = () => {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // เพิ่ม event listener สำหรับการเปลี่ยนแปลงโหมด
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery?.addEventListener) {
      darkModeMediaQuery.addEventListener('change', checkDarkMode);
      return () => darkModeMediaQuery.removeEventListener('change', checkDarkMode);
    }
  }, []);

  // กำหนดหัวข้อตามประเภทของการ์ด
  const getManagerLabel = () => {
    switch (cardType) {
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

  const managerLabel = getManagerLabel();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedItem({ ...item });
    setIsEditing(false);
  };

  const toggleAddressVisibility = () => {
    setShowAddress(!showAddress);
  };

  // เปิด modal และกำหนด action
  const handleEditClick = () => {
    setPasswordAction('edit');
    setShowPasswordModal(true);
  };

  const handleDeleteClick = () => {
    setPasswordAction('delete');
    setShowPasswordModal(true);
  };

  // เมื่อยืนยันรหัสผ่านสำเร็จ
  const handlePasswordConfirm = () => {
    if (passwordAction === 'edit') {
      setIsEditing(true);
    } else if (passwordAction === 'delete') {
      onDelete();
    }
  };

  // กำหนด classes สำหรับข้อความตามโหมด
  const labelClass = "text-sm font-bold " + (isDarkMode ? "text-gray-300" : "text-gray-500");
  const valueClass = "font-medium " + (isDarkMode ? "text-white" : "text-gray-800");

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* ส่วนหัวการ์ด */}
      <div className={`${headerColorClass} text-white p-4 flex justify-between items-center`}>
        <h2 className="text-xl font-bold">{item.name}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={isEditing ? handleCancel : handleEditClick} 
            className="bg-white text-gray-800 rounded px-3 py-1 text-sm"
          >
            {isEditing ? 'ยกเลิก' : 'แก้ไข'}
          </button>
          {!isEditing && (
            <button 
              onClick={handleDeleteClick} 
              className="bg-red-600 text-white rounded px-3 py-1 text-sm"
            >
              ลบ
            </button>
          )}
        </div>
      </div>

      {/* เนื้อหาการ์ด */}
      <div className="p-4">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block ${labelClass}`}>รหัส</label>
                <input
                  type="text"
                  name="id"
                  value={editedItem.id}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-black'
                  }`}
                  disabled
                />
              </div>
              <div>
                <label className={`block ${labelClass}`}>ชื่อสาขา</label>
                <input
                  type="text"
                  name="name"
                  value={editedItem.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-black'
                  }`}
                  required
                />
              </div>
              <div>
                <label className={`block ${labelClass}`}>เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  name="phone"
                  value={editedItem.phone}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-black'
                  }`}
                />
              </div>
              <div>
                <label className={`block ${labelClass}`}>{managerLabel}</label>
                <input
                  type="text"
                  name="manager"
                  value={editedItem.manager}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-black'
                  }`}
                />
              </div>
              <div>
                <label className={`block ${labelClass}`}>เบอร์{managerLabel}</label>
                <input
                  type="text"
                  name="managerPhone"
                  value={editedItem.managerPhone}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-black'
                  }`}
                />
              </div>
              <div>
                <label className={`block ${labelClass}`}>รหัสอินเตอร์เน็ต</label>
                <input
                  type="text"
                  name="internetId"
                  value={editedItem.internetId}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-black'
                  }`}
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className={`block ${labelClass}`}>ที่อยู่</label>
                </div>
                <textarea
                  name="address"
                  value={editedItem.address}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-black'
                  }`}
                  rows="2"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                ยกเลิก
              </button>
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                บันทึก
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className={labelClass}>รหัส</p>
              <p className={valueClass}>{item.id}</p>
            </div>
            <div>
              <p className={labelClass}>เบอร์โทรศัพท์</p>
              <p className={valueClass}>{item.phone}</p>
            </div>
            <div>
              <p className={labelClass}>{managerLabel}</p>
              <p className={valueClass}>{item.manager}</p>
            </div>
            <div>
              <p className={labelClass}>เบอร์{managerLabel}</p>
              <p className={valueClass}>{item.managerPhone}</p>
            </div>
            <div>
              <p className={labelClass}>รหัสอินเตอร์เน็ต</p>
              <p className={valueClass}>{item.internetId}</p>
            </div>
            
            {/* ปุ่มเปิด-ปิดส่วนที่อยู่ */}
            <div className="md:col-span-2 mt-2">
              <button 
                onClick={toggleAddressVisibility} 
                className="text-blue-500 text-sm hover:underline focus:outline-none flex items-center"
              >
                {showAddress ? '▼ ซ่อนที่อยู่' : '► แสดงที่อยู่'}
              </button>
              
              {/* ส่วนแสดงที่อยู่ */}
              {showAddress && (
                <div className="mt-2">
                  <p className={labelClass}>ที่อยู่</p>
                  <p className={valueClass}>{item.address}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Password Modal */}
      <PasswordModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirm}
        actionType={passwordAction}
      />
    </div>
  );
};

export default BranchCard;