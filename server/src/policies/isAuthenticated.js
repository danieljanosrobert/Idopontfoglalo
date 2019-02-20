module.exports = function (req, res, next) {
  const header = req.headers['authorization']
  if (typeof header !== 'undefined') {
    const token = header.split(' ')[1]
    req.token = token
    next()
  } else {
    res.sendStatus(403)
  }
}
