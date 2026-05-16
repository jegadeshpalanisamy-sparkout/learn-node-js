import { User } from "../models/user.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ $or: [{ email }, { name }] })
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        //for learning purposes
        console.log('salt', salt)
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        //create token with role
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        //remove password from response
        user.password = undefined;

        //send token to client with secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: 'User logged in successfully', user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export { registerUser, loginUser, logoutUser }