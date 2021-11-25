const { Schema, model } = require('mongoose')

const categorySchema = new Schema(
    {
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

const Category = model('Category', categorySchema)
module.exports = Category