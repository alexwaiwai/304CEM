import express from 'express';
var router = express.Router();

import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';

router.get("/", async (req, res) => {
  console.log("Getting All Post");
  try {
    let post = await Post.find({}).populate('user').exec();
    res.send(post)
  } catch(err){
    console.log(err)
    res.status(500).send("Error getting all books")
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(`Post about ${req.params.id}`);
    let post = await Post.findById(req.params.id).populate('user').exec();
    res.send(post)
  } catch(err){
    console.log(err)
    res.status(500).send("Error searching")
  }
});

router.post("/", async (req, res) => {
  try {
    console.log('Creating Post')
    let { email, imgID, caption, location } = req.body;
    var user = await User.find({email : email})
    const post = await new Post({
      user: user[0]._id,
      caption: caption,
      imgID: imgID,
      location: location,
    })
    const result = await post.save();
    console.log(`Post about ${result._id} is created`);
    res.send(result)
  } catch (err){
    res.status(500).send("Error creating")
  }
});

router.patch("/:id", async (req, res) => {
  console.log(`Updating Post ${req.params.id}`);
  try {
    let { imgID, caption, location } = req.body;
    let post = await Post.findById(req.params.id)
    post.caption = caption
    post.imgID = imgID
    post.location = location
    let result = await post.save();
    console.log(`Post about ${req.params.id} is updated`);
    res.send(result)
  } catch (err){
    console.log(err)
    res.status(500).send("Error Updating")
  }
});

router.get("/:id/comments", async (req, res) => {
  console.log(`Getting all comments for Post ${req.params.id}`);
  try {
    const post = await Post.findById(req.params.id)
    const comments = await Comment.find({post : post}).populate('post').populate('user').exec();
    res.send(comments)
  } catch (err){
    console.log(err)
    res.status(500).send("Error finding comments")
  }
});

router.patch("/:id/likePost", async (req, res) => {
  try {
    let { likes } = req.body;
    let post = await Post.findById(req.params.id)
    post.likes = likes
    let result = await post.save();
    console.log(`Post likes about ${req.params.id} is updated`);
    res.send(result)
  } catch (err){
    console.log(err)
    res.status(500).send("Error Updating")
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const result = await post.remove();
    res.send(result)
  } catch (err){
    res.status(500).send("Error Delete")
  }
});

//export this router to use in our index.js
export default router;
