const db = require('../connection')
const Joi = require('joi')

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  jelszo: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/).required(),
  szuletesi_ido: Joi.string().regex(/^(([12]\d{3})-([1-9]|0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/).required(),
  felhasznalonev: Joi.string().regex(/^((?!.*[_\s-]{2,})[a-zA-Z0-9][a-zA-Z0-9_\s\\-]{2,10}[a-zA-Z0-9])$/).required(),
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
function deleteFelhasznalo (felhasznalo) {
  return felhasznalok.remove({ _id: felhasznalo._id })
}

module.exports = {
  create,
  getFelhasznalok,
  deleteFelhasznalo
}
