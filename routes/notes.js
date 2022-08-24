const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Notes = require('../models/Notes')

// Login screen
router.get('/add', ensureAuth, (req,res)=>{
    res.render('notes/add')
})

//Create a new note
router.post('/', ensureAuth, async (req,res)=> {
    try{
        req.body.user = req.user.id
        await Notes.create(req.body)
        res.redirect('/dashboard')
    }
    catch (err){
        console.error(err);
        res.render('error/500')
    }
})

// Fetch and render all notes as cards
router.get('/', ensureAuth, async (req,res)=>{
    try{
        const notes = await Notes.find({ status: 'public'})
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean()
        res.render('notes/index', {
            notes,
        })

    }
    catch (err){
        console.error(err)
        res.render('error/500')
    }
})


// Read specific note
router.get('/:id', ensureAuth, async (req,res)=>{
    try{
        let notes = await Notes.findById(req.params.id)
            .populate('user')
            .lean()
        if(!notes){
            return res.render('error/404')
        }
        res.render('notes/readNote', {
            notes
        })
    }
    catch(err){
        console.error(err)
        res.render('error/404')
    }
})
// Edit notes page
router.get('/edit/:id', ensureAuth, async (req,res)=>{
    try{
        const notes = await Notes.findOne({
            _id: req.params.id
        }).lean()
        if(!notes) {
            return res.render('error/404')
        }

        if(notes.user != req.user.id){
            res.redirect('/notes')
        }
        else{
            res.render('notes/edit', {
                notes,
            })
        }
    }
    catch (err){
        console.error(err)
        return res.render('error/500')
    }
})

//Update note
router.put('/:id', ensureAuth, async (req,res)=>{
    try{
        let notes = await Notes.findById(req.params.id).lean()

        if(!notes){
            return res.render('error/404');
        }

        if(notes.user != req.user.id){
            res.redirect('/notes')
        }
        else{
            notes = await Notes.findOneAndUpdate({_id: req.params.id}, req.body,
            {
                new: true,
                runValidators: true,
            })
            res.redirect('/dashboard')
        }
    }
    catch (err){
        console.error(err)
        return res.render('error/500')
    }
})

// Delete Route
router.delete('/:id', ensureAuth, async (req,res)=>{
    try{
        await Notes.remove( {_id: req.params.id} )
        res.redirect('/dashboard')
    }
    catch (err){
        console.error(err)
        return res.render('error/500')
    }
})

// User notes
router.get('/user/:userId', ensureAuth, async (req,res)=>{
    try{
        const notes = await Notes.find({
            user: req.params.userId,
            status: 'public',
        })
        .populate('user')
        .lean()

        res.render('notes/index', {
            notes
        })
    }
    catch(err){
        console.error(err);
        res.render('error/500')
    }
})

module.exports = router