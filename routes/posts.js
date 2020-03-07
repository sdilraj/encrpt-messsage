// This file will be handling posts

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//Get Back All Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        const encryptionPost = posts.map(post => {
            let encyrptedMessage = null;

            if(post.encryptiontype === "pigLatin") {
                encyrptedMessage = pigLatin(post.message)
            } else if (post.encryptiontype === "emoGize") {
                encryptiontype = emoGize(post.message)
            } else if (post.encryptiontype === "letterScramble") {
                encryptiontype = letterScramble(post.message)
            }

            return {
                ...post.toJSON(),
                encyrptedMessage: encyrptedMessage
            }
        });


        res.json(encryptionPost);
    }
    catch(err) {
        res.json({messsage: err});
    }
});

function pigLatin(text) {
    return text; // encrypt the message
}

function emoGize(text) {
    return text;
}

function letterScramble(text) {
    return text; //random mix letter
}





// pig latin
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