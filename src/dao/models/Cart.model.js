const mongoose = require('mongoose')

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: [{
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  });
  
  const Cart = mongoose.model(cartCollection, cartSchema);
  
  module.exports = Cart;
  