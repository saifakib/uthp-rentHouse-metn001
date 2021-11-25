// external imports
const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);


// internal imports 
const { notFoundHandler, errorHandler } = require('./middleware/common/errorHandler')
const { bindUserWithRequest } = require('./middleware/auth')
const setLocals = require('./middleware/setLocals')
const Routes = require('./routes')

const app = express();

const store = new MongoDBStore({
    uri: process.env.MongoURI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2 // 2h
});

app.use(cors());
app.use(morgan());

// request parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY || 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    },
    store: store,
}))

app.use(bindUserWithRequest())
app.use(setLocals())

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// view setup
app.set('view engine', 'ejs')
const views = path.join(__dirname, "views")
app.set('views', views)

//routing setup
app.use('/', Routes)


// error handling
app.use(notFoundHandler)
app.use(errorHandler)


module.exports = app



