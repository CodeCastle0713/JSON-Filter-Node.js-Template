// index.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const fs = require('fs');

const jsonsInDir = fs.readdirSync('./config').filter(file => path.extname(file) === '.json');
let json = [];
jsonsInDir.forEach(file => {
  const fileData = fs.readFileSync(path.join('./config', file));
  json.push(JSON.parse(fileData.toString()))
});

console.log(json)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/json-data', (req, res) => {
  res.json(json);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
