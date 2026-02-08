import { db } from "../connection.js";

export const LogsModel = await db.createCollection("logs", {
  capped: true,
  size: 1024 * 1024,
});
