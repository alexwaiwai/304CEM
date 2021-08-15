import express from 'express';
var router = express.Router();

router.get("/", function (req, res) {
  const info = res.body;
  console.log(`User ${info.username} is trying to log in`);
});

router.post("/", function (req, res) {
  const info = res.body;
  console.log(`Created user ${info.username}`);
});

//export this router to use in our index.js
export default router;
