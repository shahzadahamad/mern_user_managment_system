import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from '../models/user/user.model.js'

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "You are not authenticated!"));

    const decoded = jwt.verify(token, process.env.jwtSecret);
    const user = await User.findById(decoded.id)
    if (!user) return next(errorHandler(404, "User not found"));

  jwt.verify(token, process.env.jwtSecret, (err, user) => {
    if (err) return next(errorHandler(403, "Token is Invalid!"));
    req.user = user;
    next();
  });
};
