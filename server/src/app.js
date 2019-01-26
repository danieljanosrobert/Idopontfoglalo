const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const felhasznalok = require('../db/model/felhasznalok')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => {
  res.json({
    message: 'full stack message board!'
  })
})

app.get('/felhasznalok', async (req, res) => {
  felhasznalok.getFelhasznalok().then(felhasznalok => {
    res.json(felhasznalok)
  })
})

app.post('/felhasznalok', async (req, res) => {
  console.log(req.body)
  felhasznalok.create(req.body).then((felhasznalo) => {
    res.json(felhasznalo)
  }).catch((error) => {
    res.status(500)
    res.json(error)
  })
})

app.delete('/felhasznalok', async (req, res) => {
  felhasznalok.deleteFelhasznalo(req.body).then((felhasznalo) => {
    res.json(felhasznalo)
  }).catch((error) => {
    res.status(500)
    res.json(error)
  })
})

app.post('/register', async (req, res) => {
  res.send({
    message: `Hello ${req.body.email}! Your user was registered! Have fun!`
  })
})

const port = process.env.PORT || 8082
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
