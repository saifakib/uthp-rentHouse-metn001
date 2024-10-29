// external imports
require('dotenv').config()
const mongoose = require('mongoose')

// internal imports
const app = require('./index')

// Mongo Atlas Connection string
//const mongo_uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.e3ps1.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose
    .connect(process.env.MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        // server listen
        app.listen(8000, () => {
            console.log(`Server Listen On ${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.log(err.message)
    })







