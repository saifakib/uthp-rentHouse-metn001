const { Location, Area } = require('../../models')

exports.locationCreateGetController = (req, res, next) => {
    res.render('pages/admin/locationCreate')
}

exports.locationCreatePostController = async (req, res, next) => {

    const { name } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        //req.flash('fail', 'Location Info invalid !!')
        return res.render('pages/admin/locationCreate',
            {
                error: errors.mapped(),
                value: {
                    name
                },
                // flashMessage: Flash.getMessage(req)
            });
    }
    try {

        const location = new Location({
            name
        })

        await location.save()
            .then(savedLocation => {
                //req.flash('success', 'Location Info Saved !!')
            })
            .catch(error => {
                next(error)
            })

    } catch (e) {
        next(e)
    }

    res.redirect('/admin/locations');
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



exports.areaCreateGetController = (req, res, next) => {
    res.render('pages/admin/areaCreate')
}

exports.areaCreatePostController = async (req, res, next) => {

    const { location_id, name } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        //req.flash('fail', 'Area Info invalid !!')
        return res.render('pages/admin/areaCreate',
            {
                error: errors.mapped(),
                value: {
                    name
                },
                // flashMessage: Flash.getMessage(req)
            });
    }
    try {

        const area = new Area({
            location_id,
            name
        })

        await area.save()
            .then(savedArea => {
                //req.flash('success', 'Area Info Saved !!')
            })
            .catch(error => {
                next(error)
            })

    } catch (e) {
        next(e)
    }

    res.redirect('/admin/areas');
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