const User = require('../auth/auth-users-model')

module.exports = (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password) {
        return next({ status: 401, message: "username and password required" })
    } 
    User.findBy({username})
    .then(([user]) => {
        if(user) {
            next({ status: 401, message: "username taken" })
            return
        } else {
            next()
        }
    })
    .catch(next)
}