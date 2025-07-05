const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" }
];

app.get('/api/items', (req, res) => res.json(items));

app.post('/api/items', (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
