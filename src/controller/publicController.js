exports.homeController = (req, res) => {
    res.render('pages/explorer/home', { title: 'Hey', message: 'Hello there!' })
}