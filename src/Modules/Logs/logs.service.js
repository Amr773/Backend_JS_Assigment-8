import { ObjectId } from "mongodb";
import { LogsModel } from "../../DB/Models/Logs.model.js";

export async function insertLog(bodyData) {
  const logData = {
    ...bodyData,
    book_id: new ObjectId(bodyData.book_id),
  };
  const newLog = LogsModel.insertOne(logData);
  const result = await newLog;
  return result;
}
