const mongoose = require('mongoose')

const productCollection = 'products'

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
	thumbnail: String,
	code: String,
	stock: Number,
	status: Boolean,
	category: String
})

const Product = mongoose.model(productCollection, productSchema)

module.exports = Product