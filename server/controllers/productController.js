const sharp = require('sharp');

const factory = require('./handlerFactory');
const Product = require('../models/Product');
const catchRequest = require('../utils/catchRequest');

exports.getProducts = factory.getAll(Product);

exports.createProduct = factory.createOne(Product);

exports.getProduct = factory.getOne(Product);

exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);

exports.saveImages = catchRequest(
    async (req, res, next) => {
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const ext = req.files[i].mimetype.split('/')[1];
                req.files[i].filename = `product-image-${i + 1}-${req.user.id}-${Date.now()}.${ext}`;
                req.body.images[i] = req.files[i].filename;
                await sharp(req.files[i].buffer)
                    .resize(500, 500)
                    .toFormat('jpeg')
                    .jpeg({quality: 90})
                    .toFile(`uploads/productimage/${req.files.avatarImage[0].filename}`);
            }
        }
        next();
    }
);