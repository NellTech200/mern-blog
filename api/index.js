import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
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

const __dirname = path.resolve();

const app = express();

//
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('server is running on port 3000');
});


app.use('/api/user', userRoutes);
app.use ('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
// this is to serve the static files from the client/build folder


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
// this is to serve the index.html file from the client/build folder


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