const { User, Profile } = require('../../models')

exports.homeOwnerGetController = ( req, res ) => {
    // try{
    //     const hw = await User.find({})
    //     res.render('pages/admin/homeOwnerList', {
    //         hw: hw
    //     });
    // } catch (e) {
    //     next(e)
    // }
        res.render('pages/admin/homeOwnerList')
//}
}