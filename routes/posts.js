const express = require("express");

const { createPost, getPosts, getPost, updatePost, deletePost } = require("../controllers/posts");

const postRouter = express.Router();

postRouter.route("/post").post(createPost).get(getPosts);
postRouter.route("/post/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = postRouter;