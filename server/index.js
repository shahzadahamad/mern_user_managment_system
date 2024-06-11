import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user/user.route.js';
import authRoutes from './routes/user/auth.route.js';
import adminAuthRoutes from './routes/admin/adminAuth.route.js';
import adminRoutes from './routes/admin/admin.route.js';
import cookieParser from 'cookie-parser';

// .evn imported
import dotenv from 'dotenv';
dotenv.config();

// mongodb connection
mongoose.connect(process.env.mongoUrl).then(() => {
  console.log('mongodb connected!');
}).catch((error)=> {
  console.log(error)
})

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/auth/admin',adminAuthRoutes);
app.use('/api/admin/', adminRoutes);

app.use((err,req,res,next) => {
  const  statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode,
  })
})

app.listen(3000,() => {
  console.log('server listenling on port http://localhost:3000')
});