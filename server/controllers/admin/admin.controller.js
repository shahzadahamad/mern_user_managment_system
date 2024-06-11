import User from "../../models/user/user.model.js";

export const userData = async (req,res,next) => {
  try{
    const userData = await User.find({},{password:0,profilePicture:0});
    res.status(200).json(userData);
  }catch(error) {
    console.log(error)
    next(error);
  }
}