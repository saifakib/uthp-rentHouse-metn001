const { Profile, Property } = require('../models')
const createError = require('http-errors')

module.exports = () => {
    return async (req, res, next) => {
        try {
            const profile = await Profile.findOne({ user: req.user._id });
            const profileProperties = profile.properties;

            const displayProperties = await Property.find(
                {
                    status: true,
                    properties: { $in: profileProperties }
                }
            )

            let profileTenants = await Profile.findOne({ user: req.user._id })
                .populate({
                    path: 'tenants',
                    populate: {
                        path: 'house',
                        select: 'post_id price',
                    }
                })

            res.locals.properties = profileProperties
            res.locals.profileTenants = profileTenants
            res.locals.displayProperties = displayProperties

            next()

        } catch (err) {
            next(createError(204, err.message))
        }
    }
}