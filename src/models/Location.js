const { Schema, model } = require('mongoose')

const locationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        // areas: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Area'
        //     }
        // ]
         areas: [] //if store full object
    },
    { timestamps: true }
)

const Location = model('Location', locationSchema)
module.exports = Location