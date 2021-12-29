const uploader = require("../utils/singleUploader")
const createError = require('http-errors')

function avatarUpload(req, res, next) {
    const upload = uploader(
        "propertyimage",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only .jpg, jpeg or .png format allowed!"
    )

    // call the middleware function
    upload.array('pics', 10)(req, res, (err) => {
        if (err) {
            next(createError(204, err.message))
        } else {
            next();
        }
    });
}



module.exports = avatarUpload