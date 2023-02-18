const controllerProducts = require('../products/controller.products')
const controllerCarts = require('../carts/controller.carts')

const router = (app) => {
  
  app.use('/products',controllerProducts)
  app.use('/carts',controllerCarts)
}

module.exports = router