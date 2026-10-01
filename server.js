const express = require('express');
const app = express();
const PORT = 3000;
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

// Mount products routes
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});