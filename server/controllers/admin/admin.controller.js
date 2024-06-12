import User from "../../models/user/user.model.js";

export const userData = async (req,res,next) => {
  try{
    const userData = await User.find({},{password:0,profilePicture:0});
    res.status(200).json(userData);
  }catch(error) {
    next(error);
  }
}

export const deleteUser = async (req,res,next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted!');
  }catch(error) {
    console.log(error);
    next(error);
  }
}