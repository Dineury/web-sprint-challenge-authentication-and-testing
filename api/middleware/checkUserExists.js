const User = require('../auth/auth-users-model')

module.exports = (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json("username and password required")
  }

  User.findBy({ username })
    .then(([user]) => {
      if (!user) {
        return res.status(401).json("invalid credentials")
      } 
      req.user = user
      next()
    })
}