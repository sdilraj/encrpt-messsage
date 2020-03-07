const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    message: {
        type: String,
        required: true //input must not be empty
    },
    
    //date: Data.now
    date: {
        type: Date,
        default: Date.now
    },

    encryptiontype: {
        type: String,
        required: false

    }

});



module.exports = mongoose.model('Posts', PostSchema);