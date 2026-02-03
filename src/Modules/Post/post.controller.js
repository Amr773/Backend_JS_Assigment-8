import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsCount,
} from "./post.service.js";

const postRouter = express.Router();

postRouter.post("/", async (req, res) => {
  const result = await createPost(req.body);
  return res.status(201).json({ message: "Post created sucessfully", result });
});

postRouter.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const result = await deletePost(postId, 5);
  return res.status(201).json({ message: "Post deleted", result });
});

postRouter.get("/details", async (req, res) => {
  const result = await getAllPosts();
  return res.status(201).json({ message: "done", result });
});

postRouter.get("/comment-count", async (req, res) => {
  const result = await getAllPostsCount();
  return res.status(201).json({ message: "done", result });
});

export default postRouter;
