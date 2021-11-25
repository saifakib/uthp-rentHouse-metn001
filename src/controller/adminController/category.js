const { Category } = require('../../models')

exports.categoryCreateGetController = (req, res) => {
    res.render('pages/admin/categoryCreate')
}

exports.categoryCreatePostController = async (req, res, next) => {

    const { name } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        //req.flash('fail', 'Category Info invalid !!')
        return res.render('pages/admin/categoryCreate',
            {
                error: errors.mapped(),
                value: {
                    name
                },
                // flashMessage: Flash.getMessage(req)
            });
    }
    try {

        const category = new Category({
            name
        })

        await category.save()
            .then(savedcategory => {
                //req.flash('success', 'category Info Saved !!')
                console.log(savedcategory)
            })
            .catch(error => {
                next(error)
            })

    } catch (e) {
        next(e)
    }

    res.redirect('/admin/categories');
}


exports.categoryListController = async (req, res, next) => {

    try {
        const categories = await Category.find({})
        res.render('pages/admin/categoryList', {
            categories: categories
            //flashMessage: Flash.getMessage(req)
        });
    } catch (e) {
        next(e)
    }
}