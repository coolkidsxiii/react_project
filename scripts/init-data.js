// scripts/init-data.js
import { ensureDataDir, initializeDataFile } from '../lib/db-utils';

// ข้อมูลเริ่มต้น
const branchesData = [
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

// Initialize data
function initializeData() {
  console.log('Initializing data files...');
  
  ensureDataDir();
  
  // Initialize data files
  initializeDataFile('branches', branchesData);
  initializeDataFile('deliya', deliyaData);
  initializeDataFile('saboten', sabotenData);
  initializeDataFile('menu', menuItems);
  
  console.log('Data initialization complete!');
}

// Run initialization
initializeData();