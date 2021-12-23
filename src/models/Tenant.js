const { model, Schema } = require('mongoose')

const tenantSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    house: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    due: {
        type: Number,
        default: 0
    },
    payments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property',
            required: false
        }
    ]
},
    { timestamps: true }
)

const Tenant = model('Tenant', tenantSchema)
module.exports = Tenant