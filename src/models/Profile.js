const { Schema, model } = require('mongoose');
const User = require('./User');

const userProfile = new Schema({

    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    address : {
        type : String,
        maxlength : 1000
    },

    properties : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Propertie'
        }
    ]
}, { timestamps : true })

const Profile = model('Profile', userProfile);
module.exports = Profile;