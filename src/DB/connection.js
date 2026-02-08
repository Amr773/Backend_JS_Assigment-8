import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "MongoAssignment8";
export const db = client.db(dbName);

export async function testDBconnection() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
