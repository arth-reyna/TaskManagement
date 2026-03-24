import { User } from "../models/user.js";
import { find, findOne, insertOne } from "../utils/db.helper.js";
import bcrypt from "bcrypt";
import { sign } from "../utils/jwt.js";

export const loginBL = async (email, password) => {
  try {
    const user = await findOne({
      model: User,
      filter: { email: email },
    });

    if (!user) throw new Error("email not found");

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) throw new Error("Password did not match");

    const token = await sign({ id: user._id.toString(), email: email });

    return { user, token };
  } catch (error) {
    throw new Error(`Error during Login: ${error.message}`);
  }
};

export const registerBL = async (name, email, password) => {
  try {
    const isExists = await findOne({
      model: User,
      filter: { email: email },
    });

    if (isExists) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await insertOne({
      model: User,
      filter: { name: name, email: email, password: hashedPassword },
    });

    const token = await sign({ id: user._id.toString(), email: email });

    return { user, token };
  } catch (error) {
    throw new Error(`Error during register: ${error.message}`);
  }
};
