const uploader = require("../utils/singleUploader")

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
            next(err)
        } else {
            next();
        }
    });
}



module.exports = profileAvatarUpload