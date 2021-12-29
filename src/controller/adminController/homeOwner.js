const { User } = require('../../models')
const createError = require('http-errors')

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
    } catch (err) {
        next(createError(204, err.message))
    }
}