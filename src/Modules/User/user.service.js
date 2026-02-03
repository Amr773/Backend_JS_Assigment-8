import { User } from "../../DB/Models/User.model.js";

export async function upsert(bodyData, userId) {
  const { name, email, password, role } = bodyData;
  const newUserData = User.upsert(
    { id: Number(userId), name, email, password, role },
    { validate: false },
  );
  return newUserData;
}

export async function findByEmail(userEmail) {
  const findUserEmail = User.findOne({ where: { email: userEmail } });
  return findUserEmail;
}

export async function findByPrimaryKey(userId) {
  const findUserId = User.findByPk(userId, {
    attributes: { exclude: ["role"] },
  });
  return findUserId;
}
