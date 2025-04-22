"use client"

import React, { useState } from 'react';

const BranchCard = ({ item, headerColorClass, onUpdate, onDelete, cardType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });
  const [showAddress, setShowAddress] = useState(false); // ตั้งค่าเริ่มต้นเป็น false เพื่อซ่อน

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* ส่วนหัวการ์ด */}
      <div className={`${headerColorClass} text-white p-4 flex justify-between items-center`}>
        <h2 className="text-xl font-bold">{item.name}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="bg-white text-gray-800 rounded px-3 py-1 text-sm"
          >
            {isEditing ? 'ยกเลิก' : 'แก้ไข'}
          </button>
          {!isEditing && (
            <button 
              onClick={() => {
                if (window.confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
                  onDelete();
                }
              }} 
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
                <label className="block text-sm font-medium text-gray-700">รหัส</label>
                <input
                  type="text"
                  name="id"
                  value={editedItem.id}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-black-300 rounded-md shadow-sm p-2"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ชื่อสาขา</label>
                <input
                  type="text"
                  name="name"
                  value={editedItem.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  name="phone"
                  value={editedItem.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{managerLabel}</label>
                <input
                  type="text"
                  name="manager"
                  value={editedItem.manager}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">เบอร์{managerLabel}</label>
                <input
                  type="text"
                  name="managerPhone"
                  value={editedItem.managerPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">รหัสอินเตอร์เน็ต</label>
                <input
                  type="text"
                  name="internetId"
                  value={editedItem.internetId}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">ที่อยู่</label>
                </div>
                <textarea
                  name="address"
                  value={editedItem.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              <p className="text-gray-500 text-sm font-bold">รหัส</p>
              <p className="font-medium">{item.id}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">เบอร์โทรศัพท์</p>
              <p className="font-medium">{item.phone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">{managerLabel}</p>
              <p className="font-medium">{item.manager}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">เบอร์{managerLabel}</p>
              <p className="font-medium">{item.managerPhone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">รหัสอินเตอร์เน็ต</p>
              <p className="font-medium">{item.internetId}</p>
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
                  <p className="text-gray-500 text-sm font-bold">ที่อยู่</p>
                  <p className="font-medium">{item.address}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchCard;