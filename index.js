const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('hello, kate');
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

