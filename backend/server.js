const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Esempio di endpoint GET per prodotti
app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
  ];
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
  ];
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
