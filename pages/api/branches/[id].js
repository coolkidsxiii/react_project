// pages/api/branches/[id].js
import fs from 'fs';
import path from 'path';

// Helper functions
const dataDir = path.join(process.cwd(), 'data');

const readDataFile = (filename) => {
  const filePath = path.join(dataDir, `${filename}.json`);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeDataFile = (filename, data) => {
  const filePath = path.join(dataDir, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { id } = req.query;
  
  try {
    const branches = readDataFile('branches');
    
    // GET single branch
    if (req.method === 'GET') {
      const branch = branches.find(branch => branch.id === id);
      
      if (!branch) {
        return res.status(404).json({ message: `ไม่พบข้อมูลสาขาที่มี ID: ${id}` });
      }
      
      return res.status(200).json(branch);
    }
    
    // PUT (update) branch
    if (req.method === 'PUT') {
      const index = branches.findIndex(branch => branch.id === id);
      
      if (index === -1) {
        return res.status(404).json({ message: `ไม่พบข้อมูลสาขาที่มี ID: ${id}` });
      }
      
      // Update branch but keep original ID
      const updatedBranch = { ...branches[index], ...req.body, id: branches[index].id };
      branches[index] = updatedBranch;
      
      writeDataFile('branches', branches);
      
      return res.status(200).json(updatedBranch);
    }
    
    // DELETE branch
    if (req.method === 'DELETE') {
      const filteredBranches = branches.filter(branch => branch.id !== id);
      
      if (filteredBranches.length === branches.length) {
        return res.status(404).json({ message: `ไม่พบข้อมูลสาขาที่มี ID: ${id}` });
      }
      
      writeDataFile('branches', filteredBranches);
      
      return res.status(200).json({ message: `ลบข้อมูลสาขา ID: ${id} สำเร็จ` });
    }
    
    // Method not allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการจัดการข้อมูลสาขา', error: error.message });
  }
}