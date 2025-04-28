// lib/api-route-factory.js
import { readDataFile, writeDataFile } from './db-utils';

// Factory function to create API handlers for different data types
export function createApiHandler(dataType) {
  return function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request (preflight)
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    try {
      // GET all items
      if (req.method === 'GET') {
        const items = readDataFile(dataType);
        return res.status(200).json(items);
      }
      
      // POST new item
      if (req.method === 'POST') {
        const items = readDataFile(dataType);
        const newItem = req.body;
        
        // Check if ID exists
        if (!newItem.id) {
          return res.status(400).json({ message: 'ต้องระบุ ID' });
        }
        
        // Check for duplicate ID
        if (items.some(item => item.id === newItem.id)) {
          return res.status(400).json({ message: `ID ${newItem.id} มีอยู่แล้ว` });
        }
        
        items.push(newItem);
        writeDataFile(dataType, items);
        
        return res.status(201).json(newItem);
      }
      
      // Method not allowed
      return res.status(405).json({ message: 'Method Not Allowed' });
    } catch (error) {
      return res.status(500).json({ 
        message: `เกิดข้อผิดพลาดในการจัดการข้อมูล ${dataType}`, 
        error: error.message 
      });
    }
  };
}

// Factory function for single item operations (GET, PUT, DELETE)
export function createSingleItemHandler(dataType) {
  return function handler(req, res) {
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
      const items = readDataFile(dataType);
      
      // GET single item
      if (req.method === 'GET') {
        const item = items.find(item => item.id === id);
        
        if (!item) {
          return res.status(404).json({ message: `ไม่พบข้อมูล ${dataType} ที่มี ID: ${id}` });
        }
        
        return res.status(200).json(item);
      }
      
      // PUT (update) item
      if (req.method === 'PUT') {
        const index = items.findIndex(item => item.id === id);
        
        if (index === -1) {
          return res.status(404).json({ message: `ไม่พบข้อมูล ${dataType} ที่มี ID: ${id}` });
        }
        
        // Update item but keep original ID
        const updatedItem = { ...items[index], ...req.body, id: items[index].id };
        items[index] = updatedItem;
        
        writeDataFile(dataType, items);
        
        return res.status(200).json(updatedItem);
      }
      
      // DELETE item
      if (req.method === 'DELETE') {
        const filteredItems = items.filter(item => item.id !== id);
        
        if (filteredItems.length === items.length) {
          return res.status(404).json({ message: `ไม่พบข้อมูล ${dataType} ที่มี ID: ${id}` });
        }
        
        writeDataFile(dataType, filteredItems);
        
        return res.status(200).json({ message: `ลบข้อมูล ${dataType} ID: ${id} สำเร็จ` });
      }
      
      // Method not allowed
      return res.status(405).json({ message: 'Method Not Allowed' });
    } catch (error) {
      return res.status(500).json({ 
        message: `เกิดข้อผิดพลาดในการจัดการข้อมูล ${dataType}`, 
        error: error.message 
      });
    }
  };
}