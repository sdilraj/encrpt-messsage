const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true //input must not be empty
    },
    description: {
        type: String,
        required: true
    },
    //date: Data.now
    data: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Posts', PostSchema);