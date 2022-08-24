const path = require('path');
const express = require("express");
const dotenv = require('dotenv');
const connectionToMongoDB= require('./config/db.js');
const morgan = require("morgan");
const methodOverride = require('method-override')
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

//setup body parser with express
app.use(express.urlencoded({ extended: false}));
app.use(express.json())


// setup for methodOverride
// used to change the method on a particular piece of html
// e.g. changing a post to a put request etc.
app.use(methodOverride((req,res)=>{
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}))

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

// set up a global variable to read logged user
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
})

// handlebars helpers
const { formatDate, stripTags, truncate, editIcon, select, punctuation } = require('./helpers/hbs')


//Handlebars setup 
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
        punctuation,
    },
    defaultLayout: 'main', extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(express.static('public'))


//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))

app.listen(PORT, ()=> {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})