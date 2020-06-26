const factory = require('./handlerFactory');
const Product = require('../models/Product');

exports.getProducts = factory.getAll(Product);

exports.createProduct = factory.createOne(Product);

exports.getProduct = factory.getOne(Product);

exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);