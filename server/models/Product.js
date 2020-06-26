const mongoose = require(mongoose);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name.']
    },
    description: {
        type: String,
        required: [true, 'A product must have a description.']
    },
    salePrice: {
        type: Number,
        required: [true, 'A product must have a salePrice.']
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price.']
    },
    point: {
        type: Number,
        required: [true, 'A product must have a point.']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'A product must have a category.']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;