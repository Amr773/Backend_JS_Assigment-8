import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("assigment7Part1", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export async function testDBconnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function syncDB() {
  await sequelize.sync({ alter: false });
}
