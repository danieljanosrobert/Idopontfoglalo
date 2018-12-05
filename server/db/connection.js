const monk = require('monk')
const connectionString = 'localhost/idopontfoglalo'
const db = monk(connectionString)

module.exports = db
