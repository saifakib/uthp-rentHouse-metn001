module.exports = () => {
    return (req, res, next) => {
        [res.locals.user, res.locals.isLoggedIn] = [req.user, req.session.isloggedIn]

        // console.log(res.locals.isLoggedIn)
        // console.log(res.locals.user)
        next()
    }
}