const db = require('../connection')
const Joi = require('joi')

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  jelszo: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  szuletesi_ido: Joi.date().max('now').required(),
  felhasznalonev: Joi.string().alphanum().min(3).max(30).required(),
  teljes_nev: Joi.string().required()
})

const felhasznalok = db.get('felhasznalok')

function getFelhasznalok () {
  return felhasznalok.find()
}
function create (felhasznalo) {
  const result = Joi.validate(felhasznalo, schema)
  if (result.error == null) {
    return felhasznalok.insert(felhasznalo)
  } else {
    return Promise.reject(result.error)
  }
}

module.exports = {
  create,
  getFelhasznalok
}
