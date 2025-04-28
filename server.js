const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// สร้างโฟลเดอร์ data ถ้ายังไม่มี
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// สร้างไฟล์ JSON เริ่มต้นถ้ายังไม่มี
const initializeDataFile = (filename, initialData) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), 'utf8');
    console.log(`Created initial ${filename}.json file`);
  }
};

// ข้อมูลเริ่มต้น
/*const branchesData = [
  {
    id: '1101',
    name: 'ศรีนครินทร์',
    phone: '02-123-4567',
    manager: 'คุณสมชาย ใจดี',
    managerPhone: '081-234-5678',
    internetId: 'NET-SIL-001',
    address: '123/45 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500'
  },
  {
    id: 'B002',
    name: 'สาขาอโศก',
    phone: '02-234-5678',
    manager: 'คุณสมหญิง รักดี',
    managerPhone: '082-345-6789',
    internetId: 'NET-ASK-002',
    address: '456/78 ถนนสุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110'
  },
  {
    id: 'B003',
    name: 'สาขาเซ็นทรัลเวิลด์',
    phone: '02-345-6789',
    manager: 'คุณนภา สดใส',
    managerPhone: '083-456-7890',
    internetId: 'NET-CTW-003',
    address: '999 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330'
  }
];

const deliyaData = [
  {
    id: 'DL001',
    name: 'Deliya สยามพารากอน',
    phone: '02-456-7890',
    manager: 'คุณวิภา มั่นคง',
    managerPhone: '084-567-8901',
    internetId: 'NET-DL-001',
    address: '991 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330'
  },
  {
    id: 'DL002',
    name: 'Deliya เมกาบางนา',
    phone: '02-567-8901',
    manager: 'คุณประพันธ์ ดีเลิศ',
    managerPhone: '085-678-9012',
    internetId: 'NET-DL-002',
    address: '39 หมู่ 6 ถนนบางนา-ตราด กม.8 ตำบลบางแก้ว อำเภอบางพลี สมุทรปราการ 10540'
  },
  {
    id: 'DL003',
    name: 'Deliya เซ็นทรัลลาดพร้าว',
    phone: '02-678-9012',
    manager: 'คุณจิรา พัฒนา',
    managerPhone: '086-789-0123',
    internetId: 'NET-DL-003',
    address: '1693 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900'
  }
];

const sabotenData = [
  {
    id: 'SB001',
    name: 'Saboten เซ็นทรัลเวิลด์',
    phone: '02-789-0123',
    manager: 'คุณพิชัย อนันต์',
    managerPhone: '087-890-1234',
    internetId: 'NET-SB-001',
    address: '999 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330'
  },
  {
    id: 'SB002',
    name: 'Saboten เทอร์มินอล 21',
    phone: '02-890-1234',
    manager: 'คุณสุนันทา ภักดี',
    managerPhone: '088-901-2345',
    internetId: 'NET-SB-002',
    address: '88 ซอยสุขุมวิท 19 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110'
  },
  {
    id: 'SB003',
    name: 'Saboten เอ็มควอเทียร์',
    phone: '02-901-2345',
    manager: 'คุณอนันต์ สุขสบาย',
    managerPhone: '089-012-3456',
    internetId: 'NET-SB-003',
    address: '689 ถนนสุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110'
  }
];

const menuItems = [
  { id: 'dashboard', name: 'แดชบอร์ด', icon: '📊' },
  { id: 'branches', name: 'ข้อมูลสาขา', icon: '🏢' },
  { id: 'deliya', name: 'Deliya', icon: '☕' },
  { id: 'saboten', name: 'Saboten', icon: '🍲' }
];

// สร้างไฟล์ข้อมูลเริ่มต้น
initializeDataFile('branches', branchesData);
initializeDataFile('deliya', deliyaData);
initializeDataFile('saboten', sabotenData);
initializeDataFile('menu', menuItems);*/

// Helper functions
const readDataFile = (filename) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeDataFile = (filename, data) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Generic API routes for all data types
const createDataRoutes = (dataType) => {
  // GET all items
  app.get(`/api/${dataType}`, (req, res) => {
    try {
      const data = readDataFile(dataType);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการดึงข้อมูล ${dataType}`, error: error.message });
    }
  });

  // GET single item by ID
  app.get(`/api/${dataType}/:id`, (req, res) => {
    try {
      const data = readDataFile(dataType);
      const item = data.find(item => item.id === req.params.id);
      
      if (!item) {
        return res.status(404).json({ message: `ไม่พบข้อมูล ${dataType} ที่มี ID: ${req.params.id}` });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการดึงข้อมูล ${dataType}`, error: error.message });
    }
  });

  // POST new item
  app.post(`/api/${dataType}`, (req, res) => {
    try {
      const data = readDataFile(dataType);
      const newItem = req.body;
      
      // ตรวจสอบว่ามี ID หรือไม่
      if (!newItem.id) {
        return res.status(400).json({ message: 'ต้องระบุ ID' });
      }
      
      // ตรวจสอบ ID ซ้ำ
      if (data.some(item => item.id === newItem.id)) {
        return res.status(400).json({ message: `ID ${newItem.id} มีอยู่แล้ว` });
      }
      
      data.push(newItem);
      writeDataFile(dataType, data);
      
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการสร้างข้อมูล ${dataType}`, error: error.message });
    }
  });

  // PUT update item
  app.put(`/api/${dataType}/:id`, (req, res) => {
    try {
      const data = readDataFile(dataType);
      const index = data.findIndex(item => item.id === req.params.id);
      
      if (index === -1) {
        return res.status(404).json({ message: `ไม่พบข้อมูล ${dataType} ที่มี ID: ${req.params.id}` });
      }
      
      // อัปเดตข้อมูล แต่คงค่า ID เดิม
      const updatedItem = { ...data[index], ...req.body, id: data[index].id };
      data[index] = updatedItem;
      
      writeDataFile(dataType, data);
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการอัปเดตข้อมูล ${dataType}`, error: error.message });
    }
  });

  // DELETE item
  app.delete(`/api/${dataType}/:id`, (req, res) => {
    try {
      const data = readDataFile(dataType);
      const filteredData = data.filter(item => item.id !== req.params.id);
      
      if (filteredData.length === data.length) {
        return res.status(404).json({ message: `ไม่พบข้อมูล ${dataType} ที่มี ID: ${req.params.id}` });
      }
      
      writeDataFile(dataType, filteredData);
      
      res.json({ message: `ลบข้อมูล ${dataType} ID: ${req.params.id} สำเร็จ` });
    } catch (error) {
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการลบข้อมูล ${dataType}`, error: error.message });
    }
  });
};

// สร้าง routes สำหรับข้อมูลแต่ละประเภท
createDataRoutes('branches');
createDataRoutes('deliya');
createDataRoutes('saboten');
createDataRoutes('menu');

// Route สำหรับหน้าแรก
app.get('/', (req, res) => {
  res.send('Branch Management API - โปรดใช้เส้นทาง /api/{branches|deliya|saboten|menu}');
});

// เริ่มต้น server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});