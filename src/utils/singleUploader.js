
const multer = require("multer")
const path = require('path')


function uploader(subfolder_path, allowed_file_type, maxSize, err_msg) {

    // file upload path
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

    // define the storage
    const storage = multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER)
        },

        filename: (req, file, cb) => {
            let fileExt = path.extname(file.originalname)
            let fileName = file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") + "-" + Date.now()

            cb(null, fileName + fileExt)
        }
    })

    // multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: maxSize
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_type.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(new Error(err_msg))
            }
        }
    })

    return upload
}

module.exports = uploader
