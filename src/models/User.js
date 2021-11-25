const { Schema, model } = require('mongoose')
const Profile = require('./Profile');

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            default: "male"
        },
        avatar: String,
        profile : {
            type : Schema.Types.ObjectId,
            ref : 'Profile'
        },
        password: {
            type: String,
            required: true
        },
        passwordResetToken: String,
        role: {
            type: String,
            enum: ["admin", "hw"],
            default: "hw"
        }
    },
    { timestamps: true }
)

const User = model('User', userSchema)
module.exports = User