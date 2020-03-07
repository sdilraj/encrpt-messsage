const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    message: {
        type: String,
        required: true //input must not be empty
    },
    
    //date: Data.now
    data: {
        type: Date,
        default: Date.now
    },

    encrptiontype: {
        type: String,
        required: false

    }

});



module.exports = mongoose.model('Posts', PostSchema);