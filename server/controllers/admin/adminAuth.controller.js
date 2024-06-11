import Admin from '../../models/admin/admin.model.js';
import { errorHandler } from '../../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if(!username||!password) return next(errorHandler(401,"Enter username and password"));
    const validAdmin = await Admin.findOne({username});
    if(!validAdmin) return next(errorHandler(404,'user not found'));
    const valiedPassword = bcryptjs.compareSync(password,validAdmin.password);
    if(!valiedPassword) return next(errorHandler(404,'Invalied credentials'));
    const {password:_,...rest} = validAdmin._doc;
    const token = jwt.sign({id:validAdmin._id},process.env.jwtSecret);
    res.cookie('admin_access_token',token,{httpOnly:true},new Date(Date.now() + 3600000)).status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
