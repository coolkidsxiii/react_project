// lib/db-utils.js
import fs from 'fs';
import path from 'path';

// Data directory setup
const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
export const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Initialize data file if it doesn't exist
export const initializeDataFile = (filename, initialData = []) => {
  const filePath = path.join(dataDir, `${filename}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), 'utf8');
    console.log(`Created initial ${filename}.json file`);
  }
};

// Read data from file
export const readDataFile = (filename) => {
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

// Write data to file
export const writeDataFile = (filename, data) => {
  ensureDataDir();
  const filePath = path.join(dataDir, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};