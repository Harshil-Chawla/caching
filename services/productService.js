const db = require('../database/productDatabase');

async function getAllProducts() {
  return await db.delayReadData();
}

async function getProductById(id) {
  const products = await db.delayReadData();
  return products.find((product) => product.id === Number(id));
}

async function createProduct(productData) {
  const products = await db.readData();
  const newProduct = { id: Date.now(), ...productData };
  products.push(newProduct);
  await db.writeData(products);
  return newProduct;
}

async function updateProduct(id, productData) {
  const products = await db.readData();
  const index = products.findIndex((product) => product.id === Number(id));
  if (index === -1) return null;

  products[index] = { ...products[index], ...productData };
  await db.writeData(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await db.readData();
  const updatedProducts = products.filter((product) => product.id !== Number(id));
  if (products.length === updatedProducts.length) return false;

  await db.writeData(updatedProducts);
  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
