const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest} = require('../middleware/auth')
const Notes = require('../models/Notes')

// Login screen
router.get('/', ensureGuest, (req,res)=>{
    res.render('login', {
        layout: 'login',
    })
})

// dashboard accessed after login
router.get('/dashboard', ensureAuth, async (req,res)=>{
    try{ 
        const notes = await Notes.find( { user: req.user.id} 
        ).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            notes
        })
    }
    catch(err){
        console.log(err)
        res.render('error/500')
    }
})



module.exports = router