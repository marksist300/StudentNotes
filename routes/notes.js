const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Notes = require('../models/Notes')

// Login screen
router.get('/add', ensureAuth, (req,res)=>{
    res.render('notes/add')
})
module.exports = router