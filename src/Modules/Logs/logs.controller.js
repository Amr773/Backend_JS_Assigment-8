import express from "express";
import { insertLog } from "./logs.service.js";

const logsRouter = express.Router();

logsRouter.post("/", async (req, res) => {
  const result = await insertLog(req.body);
  return res.status(201).json({ message: "Log Added", result });
});

export default logsRouter;
