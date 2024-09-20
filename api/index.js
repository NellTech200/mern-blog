import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

// the mongose.connect helps us to connect to mongodb
mongoose.connect(
    process.env.MONGO
).then(() => {
    console.log('MongoDb is connected');
})
.catch((err) => {
    console.log(err);
});

const app = express();

//
app.use(express.json());

app.listen(3000, () => {
    console.log('server is running on port 3003');
});


app.use('/api/user', userRoutes);
app.use ('/api/auth', authRoutes);

// an API generally have a rout, a req and a res 
app.use((err, req, res, next) => {
    const statusCode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});