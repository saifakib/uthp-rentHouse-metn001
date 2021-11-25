


exports.dashboardController = (req, res, next) => {
    res.render('pages/hw/dashboard', {
        name: req.user.fullname
    })
}