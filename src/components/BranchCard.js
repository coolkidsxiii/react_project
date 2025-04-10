import React from 'react';

const BranchCard = ({ item, headerColorClass }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className={`${headerColorClass} text-white p-4`}>
        <h2 className="text-xl font-bold">{item.name}</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex flex-col">
            <div className="font-semibold mb-1">รหัสสาขา:</div>
            <div className="pl-2">{item.id}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="font-semibold mb-1">เบอร์โทรสาขา:</div>
            <div className="pl-2">{item.phone}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="font-semibold mb-1">หัวหน้าสาขา:</div>
            <div className="pl-2">{item.manager}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="font-semibold mb-1">เบอร์หัวหน้าสาขา:</div>
            <div className="pl-2">{item.managerPhone}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="font-semibold mb-1">รหัสอินเทอร์เน็ต:</div>
            <div className="pl-2">{item.internetId}</div>
          </div>
          
          <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-3 border-t pt-3 mt-3">
            <div className="font-semibold mb-1">ที่อยู่:</div>
            <div className="pl-2">{item.address}</div>
          </div>
        </div>
      </div>
      
      {/* ส่วนแสดงสถานะและปุ่มดูแผนที่ */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">เปิดทำการ</span>
          </div>
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            ดูแผนที่
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;