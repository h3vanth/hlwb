const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    userID : {
        type: String,
        required: true
    },
    postID: [{
        type: String,
        required: true
    }],
    postID1: [{
        type: String,
        required: true
    }]

});

const Bookmark = mongoose.model('bookmark', bookmarkSchema);
module.exports = Bookmark;