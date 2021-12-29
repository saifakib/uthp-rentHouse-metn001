const { Category } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')
const createError = require('http-errors')

exports.categoryCreateGetController = (req, res) => {
    res.render('pages/admin/categoryCreate', {
        error: {}, value: {}
    })
}

exports.categoryCreatePostController = async (req, res, next) => {

    const { category } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        //req.flash('fail', 'Category Info invalid !!')
        return res.render('pages/admin/categoryCreate',
            {
                error: errors.mapped(),
                value: {
                    category
                },
                // flashMessage: Flash.getMessage(req)
            });
    }
    try {

        const newCategory = new Category({
            name: category
        })

        await newCategory.save()
            .then(savedcategory => {
                //req.flash('success', 'category Info Saved !!')
                console.log(savedcategory)
            })
            .catch(error => {
                next(createError(403, error.message))
            })

    } catch (e) {
        next(createError(400, e.message))
    }

    res.redirect('/admin/category/list');
}


exports.categoryListController = async (req, res, next) => {

    try {
        const categories = await Category.find({})
        res.render('pages/admin/categoryList', {
            categories: categories
        });
    } catch (e) {
        next(createError(204, e.message))
    }
}


exports.categoryUpdatePageController = async (req, res, next) => {
    try {
        const targetCategory = await Category.findById(req.query.explore)
        res.render('pages/admin/updateCategory', {
            value: {
                targetCategory
            }
        })
    } catch (err) {
        next(createError(406, err.message))
    }
}

exports.categoryUpdateController = async (req, res, next) => {
    try {
        const savedCategory = await Category.findByIdAndUpdate(req.body.id, { name: req.body.updateCategory })
        if (savedCategory) {
            res.redirect('/admin/category/list')
        }
    } catch (err) {
        next(createError(304, err.message))
    }
}