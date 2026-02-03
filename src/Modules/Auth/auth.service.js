import { User } from "../../DB/Models/User.model.js";

export async function signup(bodyData) {
  const { name, email, password, role } = bodyData;
  const newUserData = User.build({ name, email, password, role });
  const result = await newUserData.save();
  return result;
}
