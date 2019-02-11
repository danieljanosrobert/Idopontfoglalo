const db = require('../connection')

const raeresek = db.get('adminisztratorok')

function getRaeresek (arg) {
  return raeresek.find({ _id: arg }, { _id: 0, raeresek: 1 })
}

module.exports = {
  getRaeresek
}
/* const db = require('../connection')

db.adminisztratorok.update({felhasznalo:"Kiss Kiss"},{$push: {raeresek:  {nap:2, kezdeti_idopont:"10:00", veg_idopont:"16:00",idokoz:"00:10"}}})

module.exports = {
  create,
  getFelhasznalok,
  deleteFelhasznalo
}
*/
