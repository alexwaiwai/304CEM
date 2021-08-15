import mongoose from 'mongoose';
import User from './user.js'

const postSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: { 
    type: [String], 
    default: [] 
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  caption:{
    type: String, 
    required: true
  },
  imgID: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    default: null
  }
})

export default mongoose.model("Post", postSchema);