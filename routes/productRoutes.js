const express = require('express');
const router = express.Router();
const { cacheMiddleware, invalidateCache } = require('../middleware/cacheMiddleware');
const productController = require('../controllers/productController');

// GET routes (with caching middleware)
router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', cacheMiddleware, productController.getProductById);

// POST, PUT, PATCH, DELETE routes (with invalidation middleware)
router.post('/', invalidateCache, productController.createProduct);
router.put('/:id', invalidateCache, productController.updateProduct);
router.patch('/:id', invalidateCache, productController.updateProduct);
router.delete('/:id', invalidateCache, productController.deleteProduct);

module.exports = router;
