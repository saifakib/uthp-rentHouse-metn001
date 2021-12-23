const { Schema, model } = require('mongoose');

const userProfile = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    address: {
        type: String,
        maxlength: 1000
    },

    properties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],

    tenants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tenant',
            required: false
        }
    ],
}, { timestamps: true })

const Profile = model('Profile', userProfile);
module.exports = Profile;