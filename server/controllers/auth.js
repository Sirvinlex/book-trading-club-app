import User from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const signUp = async(req, res) =>{
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) return res.status(400).json({msg: "Please provide all values"});
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: "User with this email already exist"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({name, email, password: hashedPassword});
        const token = jwt.sign({ userId: user._id, name: user.name}, process.env.AUTH_KEY,);
        res.status(200).json({name: user.name, userId: user._id, token, joined: user.createdAt, city: user.city, state: user.state, 
        address: user.address, activeRequest: user.activeRequest, books: user.books, msg: "Registration successful"});
    } catch (error) {
        res.status(400).json(error);
    } 
};

export const signIn = async(req, res) =>{
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({msg: "Please provide all values"});
        const existingUser = await User.findOne({email});
        
        if (!existingUser) return res.status(400).json({msg: "Invalid Credentials"});
        const token = jwt.sign({ userId:existingUser._id, name:existingUser.name}, process.env.AUTH_KEY,);
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({msg: 'Invalid Credentials'});
        
        res.status(200).json({name: existingUser.name, userId: existingUser._id, token, joined: existingUser.createdAt, 
        city: existingUser.city, state: existingUser.state,  address: existingUser.address, activeRequest: existingUser.activeRequest,
         books: existingUser.books, msg: `Welcome Back ${existingUser.name}`});
    } catch (error) {
        res.status(400).json(error);
    }
};