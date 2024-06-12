import User from "../../models/user/user.model.js";
import { errorHandler } from "../../utils/error.js";
import bcryptjs from "bcryptjs";

export const userData = async (req, res, next) => {
  try {
    const userData = await User.find({}, { password: 0 });
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));
    res.status(200).json("User has been deleted!");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let { password, username, email, profilePicture } = req.body;

    if (password) {
      password = bcryptjs.hashSync(password, 10);
    }

    if (!username || !email) {
      return next(errorHandler(401, "Enter username and email"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: username,
          email: email,
          password: password,
          profilePicture: profilePicture,
        },
      },
      { new: true }
    );

    const { password: _, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
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
    await newUser.save();
    res.status(200).json({ message: "working properly" });
  } catch (error) {
    next(error);
  }
};
