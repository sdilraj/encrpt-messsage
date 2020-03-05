// This file will be handling posts

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//Get Back All Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err) {
        res.json({messsage: err});
    }
});



//Creating a Post
router.post('/', async (req,rest) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch(err) {
        res.json({ message: err});
    }
});

//Reading a Specific Post
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
    res.json(post);
    }
    catch(err) {
        res.json({message: err});
    }
});


//Updating a post
router.patch('/:postId', async (req,res) => {
    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.postId }, 
            {$set: {title: req.body.title}}
            );
        res.json(updatedPost);
    }
    catch (err) {
        res.json({message: err});
    }
})





//Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({_id : req.params.postId})
        res.json(removedPost);
    }
    catch(err) {
        res.json({message: err});
    }
});




module.exports = router; // exporting the router