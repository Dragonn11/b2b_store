const express = require('express');
const {
  getUsers,
  getProductById,
  createUser,
  updateUser,
  deleteUser,
  createProduct,
  getAllProducts,
  getFilteredProducts,
  login
} = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);
router.post('/register', createUser);
router.delete('/users/:id', deleteUser);


router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/filter', getFilteredProducts);
router.get('/products/:id', getProductById);


router.post('/login', login);

module.exports = router;
