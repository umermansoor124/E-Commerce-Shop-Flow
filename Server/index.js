import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import productRoutes  from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'https://umer-shop-flow.netlify.app'],
  credentials: true
}))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo DB Connected"))
.catch((Err) => console.log("Mongo Error" , Err))


app.get('/' , (req , res) => {
    res.json({message : "ShopFlow API is Running"})
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`Server Running on Port ${PORT}`))