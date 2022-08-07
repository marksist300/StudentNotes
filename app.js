const express = require("express")
//install and load dotenv
const dotenv = require('dotenv');
const connectionToMongoDB= require('./config/db.js')
const morgan = require("morgan")
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

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.render('index')
})





app.listen(PORT, ()=> {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})