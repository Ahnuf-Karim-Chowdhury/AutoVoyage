import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const getCurrentUser = async (req) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error('No token provided');
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        const userInfo = await User.findById(user.id).select(['-password -__v']);

        if (!userInfo) {
            throw new Error('User not found');
        }

        return userInfo;
    } catch (error) {
        console.error(error.message);
    }
};