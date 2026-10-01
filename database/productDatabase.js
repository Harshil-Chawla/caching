const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, '../db.json');

// Read data from db.json
async function readData() {
  const data = await fs.readFile(pathToFile, 'utf8');
  return JSON.parse(data);
}

// Write data to db.json
async function writeData(data) {
  await fs.writeFile(pathToFile, JSON.stringify(data, null, 2), 'utf8');
}

// Read data with 1.5s simulated delay
async function delayReadData() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await readData();
}

module.exports = {
  readData,
  writeData,
  delayReadData,
};
