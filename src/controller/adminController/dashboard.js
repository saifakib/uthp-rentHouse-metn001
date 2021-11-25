


exports.dashboardController = (req, res, next) => {
    res.render('pages/admin/dashboard', {
        name: req.user.fullname
    })
}