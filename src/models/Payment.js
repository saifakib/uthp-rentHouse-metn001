const { model, Schema } = require('mongoose')

const paymentSchema = new Schema({
    tenant: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    invoice: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
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
    }
},
    { timestamps: true }
)

const Payment = model('Payment', paymentSchema)
module.exports = Payment