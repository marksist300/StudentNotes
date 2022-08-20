const express = require('express')
const router = express.Router()
const passport = require('passport')

//google auth router
router.get('/google', passport.authenticate('google', {scope: ['profile']}))


//google callback after auth
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req,res)=>{
    res.redirect('/dashboard')
})

module.exports = router