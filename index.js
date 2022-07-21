const express = require('express'),
fs = require('fs'),
url = require('url');
const router = require('./TaskRout')
const app = express()
require('dotenv').config()

BASE_PORT = process.env.SERVER_BASE_PORT

app.use(express.json())

app.listen(BASE_PORT, () => {
  console.log(`Example app listening on port ${BASE_PORT}`)
  console.log('hello, kate');
})

app.use(router)

app.get('/', function (req, res, next) {
    console.log('hello');
    next(); 
})

