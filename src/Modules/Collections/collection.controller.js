import express from "express";
import {
  createAuthorCollection,
  createBookCollection,
  createLogCollection,
  createTitleIndex,
} from "./collection.service.js";

const collectionRouter = express.Router();

collectionRouter.post("/books", async (req, res) => {
  const result = await createBookCollection();
  return res.status(201).json({ message: "Books Added", result });
});

collectionRouter.post("/authors", async (req, res) => {
  const result = await createAuthorCollection(req.body);
  return res.status(201).json({ message: "Author Added", result });
});

collectionRouter.post("/logs/capped", async (req, res) => {
  const result = await createLogCollection();
  return res.status(201).json({ message: "Logs Added", result });
});

collectionRouter.post("/books/index", async (req, res) => {
  const result = await createTitleIndex();
  return res.status(201).json({ message: "Index Added", result });
});

export default collectionRouter;
