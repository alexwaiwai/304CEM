import express from 'express';
var router = express.Router();

import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';

router.get("/:id", async (req, res) => {
  try {
    console.log(`Getting comment with id ${req.params.id}`)
    const comment = await Comment.findById(req.params.id).populate('post').populate('user').exec();
    res.send(comment)
  } catch(err){
    console.log(err)
    res.status(500).send("Error searching")
  }
});

router.post("/", async (req, res) => {
  try {
    console.log('Creating comment')
    let { userID, postID, comment } = req.body;
    var user = await User.findById(userID)
    var post = await Post.findById(postID)
    const newComment = await new Comment({
      user: user,
      post: post,
      comment : comment
    })
    const result = await newComment.save()
    console.log(`Comment ${result._id} is created`);
    res.send(result)
  } catch (err){
    console.log(err)
    res.status(500).send("Error creating")
  }
});

router.patch("/:id", async (req, res) => {
  console.log(`Updating comment ${req.params.id}`);
  try {
    let { editComment } = req.body;
    let comment = await Comment.findById(req.params.id)
    comment.comment = editComment
    let result = await comment.save();
    console.log(`Comment about ${req.params.id} is updated`);
    res.send(result)
  } catch (err){
    console.log(err)
    res.status(500).send("Error Updating")
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(`Deleting Comment id ${req.params.id}`)
    const comment = await Comment.findById(req.params.id)
    const result = await comment.remove();
    res.send(result)
  } catch (err){
    console.log(err)
    res.status(500).send("Error Delete")
  }
});

//export this router to use in our index.js
export default router;
