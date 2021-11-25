const { Schema, model } = require('mongoose')

const areaSchema = new Schema(
    {
        location_id: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        properties: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Propertie',
                required: false
            }
        ]
    },
    { timestamps: true }
)

const Area = model('Area', areaSchema)
module.exports = Area