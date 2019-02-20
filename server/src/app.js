const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const felhasznalok = require('../db/model/felhasznalok')
const raeresek = require('../db/model/raeresek')
const verifyToken = require('./policies/isAuthenticated')

const app = express()

const secret = 'securesecret'

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, secret, {
    expiresIn: ONE_WEEK
  })
}

app.get('/', async (req, res) => {
  res.json({
    message: 'Ez itt a szerver oldal, az itteni tevékenységeket nehezebben tudod követni sajnos :(!'
  })
})

app.get('/felhasznalok', async (req, res) => {
  felhasznalok.getFelhasznalok().then(felhasznalok => {
    res.json(felhasznalok)
  })
})

app.post('/register', async (req, res) => {
  felhasznalok.isExistingEmail(req.body.email, function (result) {
    if (result < 1) {
      felhasznalok.isExistingUname(req.body.felhasznalonev, function (result) {
        if (result < 1) {
          felhasznalok.create(req.body).then((felhasznalo) => {
            const userJson = JSON.stringify(felhasznalo)
            res.send({
              user: userJson,
              token: jwtSignUser({ user: userJson })
            })
          }).catch((error) => {
            res.status(500)
            res.json(error)
          })
        } else {
          res.json('uname')
        }
      })
    } else {
      res.json('email')
    }
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

app.post('/raeresek', verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, (err, authData) => {
    if (err) {
      res.json('unauthorized')
    } else {
      const { doc } = req.body
      raeresek.getRaeresek(doc).then(raeresek => {
        res.json(raeresek)
      })
    }
  })
})

app.post('/login', async (req, res) => {
  const { email, jelszo } = req.body
  felhasznalok.isExistingFelhasznalo(email, jelszo, function (result) {
    if (result > 0) {
      felhasznalok.getFelhasznalo(email, jelszo).then((felhasznalo) => {
        const userJson = JSON.stringify(felhasznalo)
        res.send({
          user: userJson,
          token: jwtSignUser({ user: userJson })
        })
      })
    } else {
      res.json('false')
    }
  })
})

const port = process.env.PORT || 8082
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
