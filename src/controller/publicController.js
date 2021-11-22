exports.homeController = (req, res) => {
    res.render('pages/auth/register', { title: 'Hey', message: 'Hello there!' })
}