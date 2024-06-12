import User from "../../models/user/user.model.js";
import { errorHandler } from "../../utils/error.js";
import bcryptjs from "bcryptjs";

// updating user detials
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    let { password, username, email, profilePicture } = req.body;

    if (!username || !email) {
      return next(errorHandler(401, "Enter username and email"));
    }

    if (password) {
      password = bcryptjs.hashSync(password, 10);
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

// delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted!");
  } catch (error) {
    next(error);
  }
};
