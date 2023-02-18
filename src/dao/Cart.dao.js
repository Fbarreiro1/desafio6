const Cart = require("./models/Cart.model")

class CartDao {
  async find() {
    try {
      const carts = await Cart.find()
      return carts
    } catch (error) {
      return error
    }
  }
  async create(newCart) {
    try {
      const response = await Cart.create(newCart)
      return response
    } catch (error) {
      return error
    }
  }
  async findOneAndDelete(id) {
    try {
      const cart = await Cart.findOneAndDelete({ _id: id.toString() })
      return cart
    } catch (error) {
      return error
    }
  }

  async findById(id) {
    try {
      const cart = await Cart.findById(id)
      return cart
    } catch (error) {
      return error
    }
  }
  async save() {
    try {
      const response = await Cart.save()
      return response
    } catch (error) {
      return error
    }
  }
  
}

module.exports = CartDao