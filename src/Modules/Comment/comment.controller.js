import express from "express";
import {
  createComments,
  findOrCreateComment,
  getAllCommentsWord,
  getRecentComments,
  getSpecificComment,
  updateComment,
} from "./comment.service.js";

const commentRouter = express.Router();

commentRouter.post("/", async (req, res) => {
  const result = await createComments(req.body);
  return res
    .status(201)
    .json({ message: "Comments created sucessfully", result });
});

commentRouter.patch("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const result = await updateComment(commentId, req.body);
  return res.status(201).json({ message: "Comment updated", result });
});

commentRouter.post("/find-or-create", async (req, res) => {
  const result = await findOrCreateComment(req.body);
  return res.status(201).json({ message: "done", result });
});

commentRouter.get("/search", async (req, res) => {
  const { word } = req.query;
  const result = await getAllCommentsWord(word);
  return res.status(201).json({ message: "done", result });
});

commentRouter.get("/newest/:PostId", async (req, res) => {
  const { PostId } = req.params;
  const result = await getRecentComments(PostId);
  return res.status(201).json({ message: "done", result });
});

commentRouter.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getSpecificComment(id);
  return res.status(201).json({ message: "done", result });
});

export default commentRouter;
