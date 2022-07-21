const express = require('express')
const router = require('./TaskRout')
const app = express()
const port = 3000
app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('hello, kate');
})

app.use(router)

app.get('/', function (req, res, next) {
    console.log('hello');
    next(); 
})

