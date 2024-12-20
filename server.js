const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Endpoint di esempio
app.get('/', (req, res) => {
    res.send('Benvenuto nel backend del tuo e-commerce!');
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
