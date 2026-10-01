const productService = require('../services/productService');
const { invalidateCache } = require('../middleware/cacheMiddleware');

async function getProducts(req, res) {
  const products = await productService.getAllProducts();
  res.json(products);
}

async function getProductById(req, res) {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}

async function createProduct(req, res) {
  const newProduct = await productService.createProduct(req.body);
  invalidateCache();
  res.status(201).json(newProduct);
}

async function updateProduct(req, res) {
  const updatedProduct = await productService.updateProduct(req.params.id, req.body);
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }
  invalidateCache();
  res.json(updatedProduct);
}

async function deleteProduct(req, res) {
  const deleted = await productService.deleteProduct(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Product not found' });
  }
  invalidateCache();
  res.json({ message: 'Product deleted successfully' });
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
