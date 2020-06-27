const express = require('express');

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const uploadImage = require('../utils/uploadImage');

const router = express.Router();

router.route('/')
    .get(productController.getProducts)
    .post(authController.protect, authController.restrictTo('admin'), uploadImage.array('images'), productController.saveImages, productController.createProduct);

router.route('/:id')
    .get(productController.getProduct)
    .patch(authController.protect, authController.restrictTo('admin'), uploadImage.array('images'), productController.saveImages, productController.updateProduct)
    .delete(authController.protect, authController.restrictTo('admin'),  productController.deleteProduct);

module.exports = router;