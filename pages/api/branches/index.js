// pages/api/branches/index.js
import fs from 'fs';
import path from 'path';

// Helper functions
const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const readDataFile = (filename) => {
  const filePath = path.join(dataDir, `${filename}.json`);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeDataFile = (filename, data) => {
  const filePath = path.join(dataDir, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // GET all branches
    if (req.method === 'GET') {
      const branches = readDataFile('branches');
      return res.status(200).json(branches);
    }
    
    // POST new branch
    if (req.method === 'POST') {
      const branches = readDataFile('branches');
      const newBranch = req.body;
      
      // Check if ID exists
      if (!newBranch.id) {
        return res.status(400).json({ message: 'ต้องระบุ ID' });
      }
      
      // Check for duplicate ID
      if (branches.some(branch => branch.id === newBranch.id)) {
        return res.status(400).json({ message: `ID ${newBranch.id} มีอยู่แล้ว` });
      }
      
      branches.push(newBranch);
      writeDataFile('branches', branches);
      
      return res.status(201).json(newBranch);
    }
    
    // Method not allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการจัดการข้อมูลสาขา', error: error.message });
  }
}