import express from "express";
import { findByEmail, findByPrimaryKey, upsert } from "./user.service.js";

const userRouter = express.Router();

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await upsert(req.body, id);
  return res
    .status(201)
    .json({ message: "User created or updated sucessfully", result });
});

userRouter.get("/by-email", async (req, res) => {
  const { email } = req.query;
  const result = await findByEmail(email);
  if (result === null) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(201).json({ message: "User found", result });
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await findByPrimaryKey(id);
  if (result === null) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(201).json({ message: "User found", result });
});

export default userRouter;
