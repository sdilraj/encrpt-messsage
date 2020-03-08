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
               ...post.toObject(),
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
    var newText = text;
    if(newText.slice(0,1).match(/[aeiouAEIOU]/)) {
        newText = "way" + newText;
    }
    else {
        var moveLetters = "";
        while(newText.slice(0,1).match(/[aeiouAEIOU]/)) {
            moveLetters += newText.slice(0,1);
            newText = newText.slice(1, newText.length);
        }
        newText = newText + moveLetters + "ay";
    }
    return newText;
}



function emoGize(text) {
    return text;
}



function letterScramble(text) {
    var scramble = '';
    text = text.split('');
    while(text.length > 0) {
        scramble += text.splice(text.length * Math.random() << 0,1);
    }
    return scramble; //random mix letter
}


// pig latin
//Creating a Post
router.post('/', async (req,res) => {
    const post = new Post({
        message: req.body.message,
        encryptiontype: req.body.encryptiontype
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
router.post('/:postId', async (req,res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.postId }, 
            {message: req.body.message, encryptiontype: req.body.encryptiontype}
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