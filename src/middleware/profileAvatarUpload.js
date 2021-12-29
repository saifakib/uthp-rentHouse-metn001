const uploader = require("../utils/singleUploader")
const createError = require('http-errors')

function profileAvatarUpload(req, res, next) {
    const upload = uploader(
        "profileimage",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only .jpg, jpeg or .png format allowed!"
    )

    // call the middleware function
    upload.single('pic')(req, res, (err) => {
        if (err) {
            next(createError(204, err.message))
        } else {
            next();
        }
    });
}



module.exports = profileAvatarUpload