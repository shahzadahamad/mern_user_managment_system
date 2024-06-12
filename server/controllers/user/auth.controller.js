import User from "../../models/user/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });
  const usernameExist = await User.findOne({ username });
  if (!username || !email || !password)
    return next(errorHandler(401, "Add All Field(username,email,password)"));
  if (userExist) return next(errorHandler(401, "User already exist"));
  if (usernameExist) return next(errorHandler(401, "username not available"));
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "working properly" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return next(errorHandler(401, "Enter email and password"));
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const valiedPassword = bcryptjs.compareSync(password, validUser.password);
    if (!valiedPassword) return next(errorHandler(401, "Invalied credentials"));
    const { password: _, ...rest } = validUser.toObject();
    const token = jwt.sign({ id: validUser._id }, process.env.jwtSecret);
    res
      .cookie(
        "access_token",
        token,
        { httpOnly: true },
        new Date(Date.now() + 3600000)
      )
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;
    const user = await User.findOne({ email });
    const expiryDate = new Date(Date.now() + 3600000);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.jwtSecret);
      const { password, ...rest } = user.toObject();
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
      const username =
        name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString();
      const newUser = new User({
        username: username,
        email: email,
        password: hashPassword,
        profilePicture: photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.jwtSecret);
      const { password, ...rest } = newUser.toObject();
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout Successfully!");
};
