const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

module.exports = function (app) {
    const format = typeof (process.env.NODE_ENV) === 'string' && process.env.NODE_ENV === 'production' ? 'combined' : 'dev'

    const accessLogStream = fs.createWriteStream('accessLog.log', {
        path: path.join(__dirname, '../../../logs')
    })

    app.use(
        morgan(format, {
            stream: process.env.NODE_ENV === 'production' ? accessLogStream : process.stderr
        })
    )
}