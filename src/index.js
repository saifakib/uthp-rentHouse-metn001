// external imports
const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')


// internal imports 
const { notFoundHandler, errorHandler } = require('./middleware/common/errorHandler')
const Routes = require('./routes')

const app = express();

app.use(cors());
app.use(morgan());

// request parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// view setup
app.set('view engine', 'ejs')
app.set('views', 'views')

//routing setup
app.use('/', Routes)


// error handling
app.use(notFoundHandler)
app.use(errorHandler)


module.exports = app



