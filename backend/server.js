const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// frontend klasörünü statik olarak sunuyoruz
app.use(express.static(path.join(__dirname, '../frontend')));

// Ana sayfa için direkt index.html'i gönderiyoruz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Örnek API
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Ürün 1', price: 99.99 },
    { id: 2, name: 'Ürün 2', price: 149.99 },
    { id: 3, name: 'Ürün 3', price: 199.99 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
