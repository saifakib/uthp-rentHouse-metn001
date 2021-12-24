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
},
    { timestamps: true }
)

const Payment = model('Payment', paymentSchema)
module.exports = Payment