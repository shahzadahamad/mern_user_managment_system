import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

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
app.use(express.json())

app.use('/user',userRoutes)
app.use('/auth',authRoutes)


app.listen(3000,() => {
  console.log('server listenling on port http://localhost:3000')
});