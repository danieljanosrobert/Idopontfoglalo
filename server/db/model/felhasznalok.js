const db = require('../connection')
const Joi = require('joi')

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  jelszo: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/).required(),
  szuletesi_ido: Joi.string().regex(/^(([12]\d{3})-([1-9]|0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/).required(),
  felhasznalonev: Joi.string().regex(/^((?!.*[_\s-]{2,})[a-zA-Z0-9][a-zA-Z0-9_\s\\-]{2,10}[a-zA-Z0-9])$/).required(),
  teljes_nev: Joi.string().regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,30}$/u).required()
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

function getFelhasznalo (arg1, arg2) {
  return felhasznalok.find({ email: arg1, jelszo: arg2 })
}

function isExistingFelhasznalo (arg1, arg2, callback) {
  felhasznalok.count({ $and: [{ email: arg1, jelszo: arg2 }] }, function (err, result) {
    if (err) {
      callback(err)
    } else {
      callback(result)
    }
  })
}

function isExistingEmail (arg1, callback) {
  felhasznalok.count({ $and: [{ email: arg1 }] }, function (err, result) {
    if (err) {
      callback(err)
    } else {
      callback(result)
    }
  })
}

function isExistingUname (arg1, callback) {
  felhasznalok.count({ $and: [{ felhasznalonev: arg1 }] }, function (err, result) {
    if (err) {
      callback(err)
    } else {
      callback(result)
    }
  })
}

module.exports = {
  create,
  getFelhasznalok,
  getFelhasznalo,
  deleteFelhasznalo,
  isExistingFelhasznalo,
  isExistingEmail,
  isExistingUname
}
