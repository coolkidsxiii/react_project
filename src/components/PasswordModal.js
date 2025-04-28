"use client"

import React, { useState } from 'react';

const PasswordModal = ({ isOpen, onClose, onConfirm, actionType }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // กำหนดข้อความแสดงตามประเภทการกระทำ
  const getActionTitle = () => {
    switch (actionType) {
      case 'add':
        return 'เพิ่มข้อมูล';
      case 'edit':
        return 'แก้ไขข้อมูล';
      case 'delete':
        return 'ลบข้อมูล';
      default:
        return 'ดำเนินการ';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // สมมติว่ารหัสผ่านที่ถูกต้องคือ "admin1234"
    // ในระบบจริงควรส่งไปตรวจสอบที่ API
    try {
      // จำลองการส่งไป API เพื่อตรวจสอบรหัสผ่าน
      setTimeout(() => {
        if (password === 'admin1234') {
          onConfirm();
          setPassword('');
          onClose();
        } else {
          setError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่');
        }
        setLoading(false);
      }, 500);
      
      // สำหรับระบบจริง ควรส่งไปตรวจสอบที่ API ดังนี้
      /*
      const response = await fetch(`${API_URL}/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        onConfirm();
        setPassword('');
        onClose();
      } else {
        setError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่');
      }
      */
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการตรวจสอบ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">ยืนยันรหัสผ่านเพื่อ{getActionTitle()}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              กรุณาใส่รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              autoFocus
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              disabled={loading}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังตรวจสอบ
                </>
              ) : (
                'ยืนยัน'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;