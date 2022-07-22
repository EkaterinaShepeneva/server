const express = require('express'),
fs = require('fs'),
url = require('url');
const router = require('./routes/TaskRout')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

BASE_PORT = process.env.SERVER_BASE_PORT

//.app.use(express.json())

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true }))

app.listen(BASE_PORT, () => {
  console.log(`Example app listening on port ${BASE_PORT}`)
})

app.all('/', (req, res, next)=>{
  console.log('поймал -> ', req.body);
  res.send('yes')
})

app.use(router)

app.get('/', function (req, res, next) {
    console.log('hello');
    next(); 
})



