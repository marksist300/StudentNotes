const express = require("express")
//install and load dotenv
const dotenv = require('dotenv');
const connectionToMongoDB= require('./config/db.js')
const morgan = require("morgan");
const expressEjsLayouts = require("express-ejs-layouts");
//config setup
dotenv.config( {path: './config/config.env' })
// express as app and port setup
const app = express()
const PORT = process.env.PORT || 3000;
//connection to MongoDB
connectionToMongoDB()
//setup for morgan outputs, but only in dev mode
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}

//ejs set up and use
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(expressEjsLayouts)
//routes
app.use('/', require('./routes/index'))


app.listen(PORT, ()=> {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})