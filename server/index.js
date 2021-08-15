import express from 'express';
const app = express();

import posts from "./routes/posts.js";
import user from "./routes/user.js";
import main from "./routes/main.js";
import comment from "./routes/comment.js";
import cors from 'cors';
import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/posts", posts);
app.use("/user", user);
app.use("/comment", comment);
app.use("/main", main);


import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://admin:admin@cluster0.djx9y.mongodb.net/myClone?retryWrites=true&w=majority', {
  useNewUrlParser : true,
  useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'))


let port = 3000;
app.listen((port), () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
