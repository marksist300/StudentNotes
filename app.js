const express = require("express")
//install and load dotenv
const dotenv = require('dotenv');
const connectionToMongoDB= require('./config/db.js')

dotenv.config( {path: './config/config.env' })

const app = express()
const PORT = process.env.PORT || 3000;


connectionToMongoDB()

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})





app.listen(PORT, ()=> {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})