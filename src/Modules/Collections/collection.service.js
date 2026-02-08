import { AuthorModel } from "../../DB/Models/Authors.model.js";
import { BooksModel } from "../../DB/Models/Books.model.js";
import { LogsModel } from "../../DB/Models/Logs.model.js";

export async function createBookCollection() {
  const newBook = BooksModel.find();
  return newBook;
}


export async function createAuthorCollection(bodyData) {
  const newAuthor = AuthorModel.insertOne(bodyData);
  const result = await newAuthor;
  return result;
}

export async function createLogCollection() {
  const newLog = LogsModel.find();
  return newLog;
}

export async function createTitleIndex() {
  const newIndex = await BooksModel.createIndex({ title: 1 });
  return newIndex;
}
