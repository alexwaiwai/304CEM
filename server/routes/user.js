import express from 'express';
var router = express.Router();

import User from '../models/user.js';
import Post from '../models/post.js';


// get the username
router.get("/email/:email", async (req, res) => {
  console.log(`Check the username of email ${req.params.email}`);
  try {
    var user = await User.find({email : req.params.email})
    if(user.length < 0) res.send("User not found")
    else res.send(user[0])
  } catch (err){
    res.status(500).send("Error searching")
  }
});

// check is the username register
router.get("/:username", async (req, res) => {
  console.log(`Check of ${req.params.username}`);
  try {
    var user = await User.find({username : req.params.username})
    if(user.length > 0) res.send("Username is already registered")
    else res.send(true)
  } catch (err){
    res.status(500).send("Error searching")
  }
});

// get the id for the username
router.get("/:username/id", async (req, res) => {
  console.log(`Check the id of ${req.params.username}`);
  try {
    var user = await User.find({username : req.params.username})
    console.log(user)
    if(user.length > 0) res.send(user[0]._id)
    else res.send(false)
  } catch (err){
    res.status(500).send("Error searching")
  }
});

// register user
router.post("/", async (req, res) => {
  console.log(`Register of ${req.body.username}`);
  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username
    })
    const result = await user.save();
    res.status(201).json({ result });
  } catch (err){
    res.status(500).send("Error creating user")
  }
});

//get all the posts created by this user
router.get("/:username/posts", async (req, res) => {
  console.log(`Posts of Username :  ${req.params.username}`);
  try {
    const user = await User.find({
      username : req.params.username})
    var posts = await Post.find({user : user}).populate('user').exec();
    if(posts.length < 0) res.send({
      post : 0
    })
    else res.send(posts)
  } catch (err){
    res.status(500).send("Error searching user post")
  }
});

//edit the password and email
router.put("/:username/edit", function (req, res) {
  console.log(`Info of ${req.params.username} is updated`);
});

//Get all the liked post
router.get("/:username/like", function (req, res) {
  console.log(`All Posts of ${req.params.username} liked`);
});

//export this router to use in our index.js
export default router;
