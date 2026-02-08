import { BooksModel } from "../../DB/Models/Books.model.js";

export async function insertBook(bodyData) {
  const newBook = BooksModel.insertOne(bodyData);
  const result = await newBook;
  return result;
}

export async function insertBatch(bodyData) {
  if (bodyData.length < 3) {
    throw new Error("You must insert at least 3 books");
  }
  const result = await BooksModel.insertMany(bodyData);
  return result;
}

export async function updateFutureBook() {
  const updatedBook = BooksModel.updateOne(
    { title: "Future" },
    { $set: { year: 2022 } },
  );
  const result = await updatedBook;
  return result;
}

export async function findBookByTitle(bookTitle) {
  const findBookTitle = BooksModel.findOne({ title: bookTitle });
  const result = await findBookTitle;
  return result;
}

export async function findBookByYear(firstYear, secondYear) {
  const findBookYear = BooksModel.find({
    year: {
      $gte: firstYear,
      $lte: secondYear,
    },
  }).toArray();
  return findBookYear;
}

export async function findBookByGenre(bookGenre) {
  const findBookGenre = BooksModel.find({
    genres: bookGenre,
  }).toArray();
  return findBookGenre;
}

export async function findBookAndSkip() {
  const result = BooksModel.find({}).skip(2).limit(3).toArray();
  return result;
}

export async function findBookExculdeGenre() {
  const result = BooksModel.find({
    genres: {
      $nin: ["Horror", "Science Fiction"],
    },
  }).toArray();
  return result;
}

export async function deleteBooks(bookYear) {
  const result = await BooksModel.deleteMany({ year: { $lt: bookYear } });
  return result;
}

export async function fliterAndSort() {
  const result = BooksModel.aggregate([
    {
      $match: {
        year: { $gt: 2000 },
      },
    },
    {
      $sort: {
        year: -1,
      },
    },
  ]).toArray();
  return result;
}

export async function filterTitleAuthorAndYear() {
  const result = BooksModel.aggregate([
    {
      $match: {
        year: { $gt: 2000 },
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        author: 1,
        year: 1,
      },
    },
  ]).toArray();

  return result;
}

export async function breakGenres() {
  const result = BooksModel.aggregate([
    {
      $unwind: "$genres",
    },
    {
      $project: {
        _id: 0,
        genre: "$genres",
      },
    },
  ]).toArray();

  return result;
}

export async function joinBooksWithLogs() {
  const result = BooksModel.aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "book_id",
        as: "logs",
      },
    },
  ]).toArray();

  return result;
}
