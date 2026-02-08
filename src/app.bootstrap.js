import express from "express";
import { testDBconnection } from "./DB/connection.js";
import { BooksModel } from "./DB/Models/Books.model.js";
import collectionRouter from "./Modules/Collections/collection.controller.js";
import { AuthorModel } from "./DB/Models/Authors.model.js";
import { LogsModel } from "./DB/Models/Logs.model.js";
import bookRouter from "./Modules/Books/books.controller.js";
import logsRouter from "./Modules/Logs/logs.controller.js";

async function bootstrap() {
  const app = express();
  const port = 3000;

  await testDBconnection();

  app.use(express.json());
  app.use("/collection", collectionRouter);
  app.use("/books", bookRouter);
  app.use("/logs", logsRouter);
  
  app.use((error, req, res, next) => {
    return res
      .status(error.cause?.statusCode ?? 500)
      .json({ errMsg: error, errStack: error.stack });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

export default bootstrap;
