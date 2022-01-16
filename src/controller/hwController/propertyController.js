const { Property, Location, Profile, Category, Area } = require('../../models')
const createError = require('http-errors')

exports.propertyCreateGetController = async (req, res) => {
    //const locations = await Location.find()
    const areas = await Area.find({ status: !false })
    res.render('pages/hw/propertyCreate', {
        error: {}, value: {}, areas
    })
}

exports.propertyCreatePostController = async (req, res, next) => {

    const {
        areaid, categoryid, sector_no, road_no, house_no, short_address, monthid, bedroom,
        bathroom, belcony, floor, size, gender, price, fire_alarm, negotiable, electricity_bill,
        gas_bill, lift, garage, cctv, gas, wifi, details } = req.body;

    try {
        const newproperty = new Property({
            post_id: Math.floor(Math.random() * 9999),
            homeOwner_id: req.user._id,
            area_id: areaid,
            category: categoryid,
            short_address: short_address,
            month_need_from: monthid,
            bedRoom: bedroom,
            bathRoom: bathroom,
            floor_no: floor,
            gender: gender,
            price: price
        })

        newproperty.price_include = []
        newproperty.facilities = []

        if (sector_no != '') newproperty.sector_no = sector_no
        if (road_no != '') newproperty.road_no = road_no
        if (house_no != '') newproperty.house_no = house_no
        if (belcony != '') newproperty.belCony = belcony
        if (size != '') newproperty.size = size
        if (negotiable == 'on') newproperty.price_include.push('Negotiable')
        if (electricity_bill == 'on') newproperty.price_include.push('Electricity Bill')
        if (gas_bill == 'on') newproperty.price_include.push('Gas Bill')
        if (lift == 'on') newproperty.facilities.push('Lift')
        if (garage == 'on') newproperty.facilities.push('Garage')
        if (cctv == 'on') newproperty.facilities.push('CCTV')
        if (gas == 'on') newproperty.facilities.push('GAS')
        if (wifi == 'on') newproperty.facilities.push('WIFI')
        if (fire_alarm == 'on') newproperty.facilities.push('Fire Alarm')
        if (details != '') newproperty.description = details
        if (req.files.length > 0) {
            req.files.map((file) => {
                newproperty.picture.push(file.filename)
            })
        }

        await newproperty.save()
            .then(async (savedproperty) => {
                await Profile.findOneAndUpdate(
                    { user: req.user._id },
                    {
                        $push: { properties: savedproperty._id }
                    })
                await Category.findByIdAndUpdate(categoryid, {
                    $push: { properties: savedproperty._id }
                })
                await Area.findByIdAndUpdate(areaid, {
                    $push: { properties: savedproperty._id }
                })
                console.log(savedproperty)
                res.redirect('/hw/dashboard');
            })
            .catch(error => {
                next(createError(205, error.message))
            })

    } catch (e) {
        next(createError(400, e.message))
    }
}


exports.propertyListController = async (req, res, next) => {

    try {
        let properties = await Property.find()
            .populate({
                path: 'area_id',
                select: 'name location_name'
            })
        console.log(properties)
        res.render('pages/hw/propertyList', {
            properties
        })
    } catch (e) {
        next(createError(204, e.message))
    }
}


exports.propertyUpdatePageController = async (req, res, next) => {
    try {
        const targetproperty = await Property.findById(req.query.id)
        res.render('pages/hw/updateProperty', {
            value: {
                targetproperty
            }
        })
    } catch (err) {
        next(createError(406, err.message))
    }
}

exports.propertyUpdateController = async (req, res, next) => {
    const {
        categoryid, sector_no, road_no, house_no, short_address, monthid, bedroom,
        bathroom, belcony, floor, size, gender, price, fire_alarm, negotiable, electricity_bill,
        gas_bill, lift, garage, cctv, gas, wifi, details } = req.body;

    try {
        const privious = await Property.findById(req.query.id)
        let updateObj = {
            short_address: short_address,
            month_need_from: monthid,
            bedRoom: bedroom,
            bathRoom: bathroom,
            floor_no: floor,
            gender: gender,
            price: price
        }
        updateObj.price_include = []
        updateObj.facilities = []

        if (sector_no != '') updateObj.sector_no = sector_no
        if (road_no != '') updateObj.road_no = road_no
        if (house_no != '') updateObj.house_no = house_no
        if (belcony != '') updateObj.belCony = belcony
        if (size != '') updateObj.size = size
        if (negotiable == 'on') updateObj.price_include.push('Negotiable')
        if (electricity_bill == 'on') updateObj.price_include.push('Electricity Bill')
        if (gas_bill == 'on') updateObj.price_include.push('Gas Bill')
        if (lift == 'on') updateObj.facilities.push('Lift')
        if (garage == 'on') updateObj.facilities.push('Garage')
        if (cctv == 'on') updateObj.facilities.push('CCTV')
        if (gas == 'on') updateObj.facilities.push('GAS')
        if (wifi == 'on') updateObj.facilities.push('WIFI')
        if (fire_alarm == 'on') updateObj.facilities.push('Fire Alarm')
        if (details != '') updateObj.description = details

        if (privious.category == categoryid) {
            await Property.findByIdAndUpdate(req.query.id, { $set: updateObj })
                .then(() => {
                    res.redirect('/hw/property/list')
                })
                .catch(error => {
                    next(error)
                })
        } else {
            updateObj.category = categoryid
            await Property.findByIdAndUpdate(req.query.id, { $set: updateObj })
                .then(async (savedproperty) => {
                    await Category.findOneAndUpdate(
                        { _id: privious.category },
                        { $pull: { properties: savedproperty._id } }
                    )
                        .then(async () => {
                            await Category.findByIdAndUpdate(categoryid, {
                                $push: { properties: savedproperty._id }
                            })
                                .then(() => {
                                    res.redirect('/hw/property/list')
                                })
                                .catch(error => {
                                    next(createError(304, error.message))
                                })
                        })
                        .catch(error => {
                            next(createError(304, error.message))
                        })
                })
                .catch(error => {
                    next(createError(304, error.message))
                })
        }

    } catch (err) {
        next(createError(400, err.message))
    }
}
