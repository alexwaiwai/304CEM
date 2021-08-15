import mongoose from 'mongoose';

import User from './user.js'
import Post from './post.js'

const commentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post : { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  comment: { 
    type: String, 
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
})

export default mongoose.model("Comment", commentSchema);