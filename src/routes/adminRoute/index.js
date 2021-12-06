/**
 * Route /admin/
 */

const router = require('express').Router()
const { Category } = require('../../models')



const dashboardRoute = require('./dashboardRoute')
const locationRoute = require('./locationRoute')
const areaRoute = require('./areaRoute')
const categoryRoute = require('./categoryRoute')
const hwRoute = require('./homeOwnerRoute')

// Service Route
router.use('/dashboard', dashboardRoute)
router.use('/location', locationRoute)
router.use('/area', areaRoute)
router.use('/category', categoryRoute)
router.use('/homeowner', hwRoute)


router.get('/status', async ( req, res, next ) => {
    try{
        const Model = req.query.model == 'Category' ? Category : req.query.model == 'Area' ? Area : '';
        let changes = await Model.findByIdAndUpdate(req.query.id, { status: !req.query.status })
        if(changes) {
            const model = (req.query.model).toLowerCase()
            res.redirect(`/admin/${model}/list`)
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router