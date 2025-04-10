import React from 'react';

const Dashboard = ({ branchesCount, deliyaCount, sabotenCount }) => {
  const totalCount = branchesCount + deliyaCount + sabotenCount;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">แดชบอร์ด</h2>
      <p>แสดงภาพรวมของข้อมูลสาขาและสถิติที่สำคัญ</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold">สาขาทั่วไป</h3>
          <p className="text-2xl font-bold mt-2">{branchesCount}</p>
        </div>
        <div className="bg-amber-100 p-4 rounded-lg">
          <h3 className="font-semibold">สาขา Deliya</h3>
          <p className="text-2xl font-bold mt-2">{deliyaCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold">สาขา Saboten</h3>
          <p className="text-2xl font-bold mt-2">{sabotenCount}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold">สาขาทั้งหมด</h3>
          <p className="text-2xl font-bold mt-2">{totalCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;