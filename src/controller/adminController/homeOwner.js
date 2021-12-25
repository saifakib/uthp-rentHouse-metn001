const { User } = require('../../models')

exports.homeOwnerGetController = async (req, res, next) => {
    try {
        const users = await User.find().where( { role: 'hw' })
        .populate({
            path: 'profile',
            select: 'properties tenants'
        })
        res.render('pages/admin/homeOwnerList', {
            users
        });
    } catch (e) {
        next(e)
    }
}