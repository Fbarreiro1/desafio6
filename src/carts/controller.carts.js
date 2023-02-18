const { Router } = require('express')
const CartDao = require('../dao/Cart.dao')
const Cart = new CartDao()
const ProductDao = require('../dao/Product.dao')
const Product = new ProductDao()

const router = Router()

router.get('/', async (req, res) => {
  try {
    console.log("controller cart")
    const carts = await Cart.find()

  res.json(carts)
  }
  catch (error) {
    res.status(400).json({ error })
  }
})

router.post('/', async (req, res) => {
    try {
      const { products } = req.body;
  
      const newCart = {
        products,
      };
  
      const response = await Cart.create(newCart);
  
      res.json({ message: response });
    } catch (error) {
      res.status(400).json({ error });
    }
  });

  
router.post('/:cartId/products/:productId', async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;
  
      const cart = await Cart.findById(cartId);
      const product = await Product.findById(productId);
  
      if (!cart) {
        throw new Error(`Cart with ID ${cartId} not found`);
      }
  
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
  
      const existingProductIndex = cart.products.findIndex(
        p => p.product_id.toString() === productId
      );
  
      if (existingProductIndex >= 0) {
        // If the product already exists in the cart, update its quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Otherwise, add the new product to the cart
        cart.products.push({
          product_id: productId,
          quantity
        });
      }
  
      await cart.save();
  
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params
  
      if (id) {
        const cart = await Cart.findOneAndDelete(id)
  
        if (!cart) {
          throw new Error(`Product with ID ${id} not found`)
        }
  
        res.json(cart)
      } else {
        throw new Error('No ID parameter provided')
      }
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  })

module.exports = router