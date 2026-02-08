import express from "express";
import {
  insertBatch,
  insertBook,
  updateFutureBook,
  findBookByTitle,
  findBookByYear,
  findBookByGenre,
  findBookAndSkip,
  findBookExculdeGenre,
  deleteBooks,
  fliterAndSort,
  filterTitleAuthorAndYear,
  breakGenres,
  joinBooksWithLogs,
} from "./books.service.js";

const bookRouter = express.Router();

bookRouter.post("/", async (req, res) => {
  const result = await insertBook(req.body);
  return res.status(201).json({ message: "Book Added", result });
});

bookRouter.post("/batch", async (req, res) => {
  const result = await insertBatch(req.body);
  return res.status(201).json({ message: "Books Batch Added", result });
});

bookRouter.patch("/Future", async (req, res) => {
  const result = await updateFutureBook();
  return res.status(201).json({ message: "Book Added", result });
});

bookRouter.get("/title", async (req, res) => {
  const { title } = req.query;
  const result = await findBookByTitle(title);
  return res.status(201).json({ message: "Book Found", result });
});

bookRouter.get("/year", async (req, res) => {
  const firstYear = Number(req.query.from);
  const secondYear = Number(req.query.to);
  const result = await findBookByYear(firstYear, secondYear);
  return res.status(201).json({ message: "Book Found", result });
});

bookRouter.get("/genre", async (req, res) => {
  const { genre } = req.query;
  const result = await findBookByGenre(genre);
  return res.status(201).json({ message: "Book Found", result });
});

bookRouter.get("/skip-limit", async (req, res) => {
  const result = await findBookAndSkip();
  return res.status(201).json({ message: "Books Found", result });
});

bookRouter.get("/exclude-genres", async (req, res) => {
  const result = await findBookExculdeGenre();
  return res.status(201).json({ message: "Book Found", result });
});

bookRouter.delete("/before-year", async (req, res) => {
  const { year } = req.query;
  const deleteYear = Number(year);
  const result = await deleteBooks(deleteYear);
  return res.status(201).json({ message: "Book Found", result });
});

bookRouter.get("/aggregate1", async (req, res) => {
  const result = await fliterAndSort();
  return res.status(201).json({ message: "Book Found", result });
});

bookRouter.get("/aggregate2", async (req, res) => {
  const result = await filterTitleAuthorAndYear();
  return res.status(201).json({ message: "Book Found", result });
});

bookRouter.get("/aggregate3", async (req, res) => {
  const result = await breakGenres();
  return res.status(201).json({ message: "Book Found", result });
});

bookRouter.get("/aggregate4", async (req, res) => {
  const result = await joinBooksWithLogs();
  return res.status(201).json({ message: "Book Found", result });
});

export default bookRouter;
