import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        requireed: true,
    },
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
},
    {timestamps: true}
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
// Compare this snippet from api/controllers/post.controller.js:
// import Post from '../models/post.model.js';
// import { errorHandler } from '../utils/error.js';
//