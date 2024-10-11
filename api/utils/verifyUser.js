import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;


    if (!token) {
        console.log('Token missing. Unauthorized request.');
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed. Unauthorized request.', err);
            return next(errorHandler(401, 'Unauthorized'));
        }
        console.log('Token verified successfully. User:', user);
        req.user = user;
        next();
    });
};