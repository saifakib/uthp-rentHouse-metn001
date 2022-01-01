const { Schema, model } = require('mongoose')

const areaSchema = new Schema(
    {
        location_id: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
            required: true
        },
        location_name: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        properties: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Property',
                required: false
            }
        ]
    },
    { timestamps: true }
)

const Area = model('Area', areaSchema)
module.exports = Area