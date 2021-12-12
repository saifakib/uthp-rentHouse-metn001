const { Location, Area } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')

exports.locationCreateGetController = (req, res, next) => {
    res.render('pages/admin/locationCreate', {
        error: {}, value: {}
    })
}

exports.locationCreatePostController = async (req, res, next) => {

    const { location } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        //req.flash('fail', 'Location Info invalid !!')
        return res.render('pages/admin/locationCreate',
            {
                error: errors.mapped(),
                value: {
                    location
                },
                // flashMessage: Flash.getMessage(req)
            });
    }
    try {

        const newLocation = new Location({
            name: location
        })

        await newLocation.save()
            .then(savedLocation => {
                //req.flash('success', 'Location Info Saved !!')
            })
            .catch(error => {
                next(error)
            })

    } catch (e) {
        next(e)
    }

    res.redirect('/admin/location/list');
}


exports.locationListController = async (req, res, next) => {

    try {
        const locations = await Location.find({})
        res.render('pages/admin/locationList', {
            locations: locations
            //flashMessage: Flash.getMessage(req)
        });
    } catch (e) {
        next(e)
    }
}


exports.locationUpdatePageController = async (req, res, next) => {
    try {
        const targetLocation = await Location.findById(req.query.explore)
        res.render('pages/admin/updateDistrict', {
            value: {
                targetLocation
            }
        })
    } catch (err) {
        next(err)
    }
}

exports.locationUpdateController = async (req, res, next) => {
    try {
        const savedLocation = await Location.findByIdAndUpdate(req.body.id, { name: req.body.updateLocation })
        if (savedLocation) {
            res.redirect('/admin/location/list')
        }
    } catch (err) {
        next(err)
    }
}



exports.areaCreateGetController = async (req, res, next) => {
    try {
        const districts = await Location.find()
        res.render('pages/admin/areaCreate', {
            districts,
            error: {}
        })
    } catch (err) {
        next(err)
    }

}

exports.areaCreatePostController = async (req, res, next) => {

    const { district_id, area } = req.body;

    try {
        let location = await Location.findById( district_id )
        let find = await Area.findOne({ name: area }, { location_id: district_id })
        if (find) {
            const districts = await Location.find()
            res.render('pages/admin/areaCreate',
                {
                    error: {
                        area: `${area} is allready in this District`
                    },
                    value: {},
                    districts
                    // flashMessage: Flash.getMessage(req)
                });
        } else {
            const newArea = new Area({
                location_id: district_id,
                location_name: location.name,
                name: area,
            })

            await newArea.save()
                .then(async (newSavedArea) => {
                    let updateLocation = await Location.findOneAndUpdate(
                        district_id,
                        { $push: { areas: newSavedArea } }
                        //{ $push: { areas: newSavedArea._id } }
                    )
                    if (updateLocation) {
                        res.redirect('/admin/area/list');
                    }
                    //req.flash('success', 'Area Info Saved !!')
                })
                .catch(error => {
                    next(error)
                })
        }
    } catch (err) {
        next(err)
    }
}


exports.areaListController = async (req, res, next) => {

    try {
        const areas = await Area.find({})
        res.render('pages/admin/areaList', {
            areas: areas
            //flashMessage: Flash.getMessage(req)
        });
    } catch (e) {
        next(e)
    }
}


exports.areaUpdatePageController = async (req, res, next) => {
    try {
        const targetArea = await Area.findById(req.query.explore)
        res.render('pages/admin/updateArea', {
            value: {
                targetArea
            }
        })
    } catch (err) {
        next(err)
    }
}

exports.areaUpdateController = async (req, res, next) => {
    try {
        const savedArea = await Area.findByIdAndUpdate(req.body.id, { name: req.body.updateArea })
        if (savedArea) {
            res.redirect('/admin/area/list')
        }
    } catch (err) {
        next(err)
    }
}