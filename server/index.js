import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.mongoUrl).then(() => {
  console.log('mongodb connected!');
}).catch((error)=> {
  console.log(error)
})

const app = express();

app.listen(3000,() => {
  console.log('server listenling on port http://localhost:3000')
});