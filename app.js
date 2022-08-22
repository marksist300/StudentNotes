const path = require('path');
const express = require("express");
const dotenv = require('dotenv');
const connectionToMongoDB= require('./config/db.js');
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
//config setup
dotenv.config( {path: './config/config.env' })

//passport config
require('./config/passport')(passport)

// express as app and port setup
const app = express()
const PORT = process.env.PORT || 3000;

//connection to MongoDB
connectionToMongoDB()



//setup for morgan outputs, but only in dev mode
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}

//Sessions middleware, must be above passport middleware in code
app.use(
    session({
    secret: 'anything',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Handlebars setup 
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use(express.static('public'))

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


app.listen(PORT, ()=> {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})