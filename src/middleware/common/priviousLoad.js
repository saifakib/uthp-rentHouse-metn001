const { Category, Location } = require('../../models')

module.exports = () => {
    return async (req, res, next) => {
        try {
            const categories = await Category.find({ status: true })
            const locations = await Location.find()
            
            res.locals.categories = categories
            res.locals.locations = locations

            next()

        } catch (err) {
            next(err)
        }
    }

}