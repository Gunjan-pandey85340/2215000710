const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9876;

// Enable CORS for React frontend
app.use(cors());

// Mock data for our microservice
const mockData = {
  e: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], // even
  p: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29], // prime
  f: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],   // fibonacci
  r: [5, 17, 23, 9, 11, 4, 8, 15, 6, 19]   // random
};

app.get('/numbers/:type', (req, res) => {
  const type = req.params.type;
  const numbers = mockData[type] || [];
  
  const avg = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  
  res.json({
    windowPrevState: [],
    windowCurrState: numbers,
    numbers: numbers,
    avg: parseFloat(avg.toFixed(2))
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});