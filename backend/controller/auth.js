import { loginBL, registerBL } from "../services/auth.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await loginBL(email, password);

    return res.status(200).json({
      success: true,
      message: "login sucessful",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerBL(name, email, password);

    return res.status(201).json({
      success: true,
      message: "registered sucessfull",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
