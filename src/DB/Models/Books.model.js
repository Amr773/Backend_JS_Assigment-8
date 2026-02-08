import { db } from "../connection.js";

export const BooksModel = await db.createCollection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1,
          description: "Title can not be empty",
        },
      },
    },
  },
});
