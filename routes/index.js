const { application } = require('express')
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
    res.render('login', {
        layout: './layouts/login',
    })
})

router.get('/home', (req,res)=>{
    res.render('home', {
        layout: 'home',
    })
})

module.exports = router