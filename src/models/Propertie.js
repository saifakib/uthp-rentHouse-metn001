const { Schema, model } = require('mongoose')

const propertieSchema = new Schema(
    {
        homeOwner_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        area_id: {
            type: Schema.Types.ObjectId,
            ref: 'Area',
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        sector_no: String,
        road_no: String,
        house_no: String,
        short_address: String,
        month_need_from: {
            type: Number,
            required: true
        },
        bedRoom: Number,
        bathRoom: Number,
        belCony: Number,
        floor_no: Number,
        size: String,
        gender: String,
        price: {
            type: Number
        },
        price_include: [
            {
                type: String
            }
        ],
        facilities: [
            {
                type: String
            }
        ],
        description: {
            type: String
        },
        picture: String
    },
    { timestamps: true }
)

const Propertie = model('Propertie', propertieSchema)
module.exports = Propertie