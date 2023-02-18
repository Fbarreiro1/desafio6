const Product = require("./models/Product.model")

class ProductDao {
  async find() {
    try {
      const products = await Product.find()
      return products
    } catch (error) {
      return error
    }
  }

  async findById(id) {
    try {
      const product = await Product.findById(id)
      return product
    } catch (error) {
      return error
    }
  }

  async findOneAndDelete(id) {
    try {
      const product = await Product.findOneAndDelete({ _id: id.toString() })
      return product
    } catch (error) {
      return error
    }
  }

  async findOneAndUpdate(id,body) {
    try {
      const product = await Product.findOneAndUpdate({ _id: id.toString() }, body)
      return product
    } catch (error) {
      return error
    }
  }

  async create(newProduct) {
    try {
      const response = await Product.create(newProduct)
      return response
    } catch (error) {
      return error
    }
  }

  async deleteMany() {
    try {
      await Product.deleteMany()
      return 'Productos eliminados'
    } catch (error) {
      return error
    }
  }
}

module.exports = ProductDao