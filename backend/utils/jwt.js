import jwt from "jsonwebtoken";

export const sign = async (data) => {
  const { id, email } = data;
  const token = await jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export const verify = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};
