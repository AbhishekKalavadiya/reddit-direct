const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    email: { type: Schema.Types.ObjectId, ref: 'user' },
    content: { type: String, required: true, trim: true }     

});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;