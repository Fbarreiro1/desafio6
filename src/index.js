const express = require('express')
const router = require('./router')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { db } = require('./config')
const { userDb, passDb } = db
const handlebars = require("express-handlebars")
const {Server} = require("socket.io")



const app = express()

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json())
app.engine("handlebars", handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")
app.use(express.static(__dirname+"/public"))

app.use(morgan('dev'))

router(app)

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb+srv://${userDb}:${passDb}@cluster0.c9r329l.mongodb.net/ecommerce?retryWrites=true&w=majority`, error => {
  if (error) {
    console.log(`Cannot connect to db. Error ${error}`)
  }
  console.log('db connected')
})

module.exports = app