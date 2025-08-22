import type { Request, Response } from "express";
import { User } from "../models/user.model.ts";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password} = req.body;

        const existingUser = await User.findOne({ username });
        if(existingUser) return res.status(409).json({message: "Username alredy taken"});
        
        const newUser = new User({
            username, 
            password,
        })
        await newUser.save();

        const createdUser = await User.findById(newUser._id).select("-password");

        console.log("New User: ", createdUser);
        return res.status(201).json({message: 'User register successfully', user: createdUser});
    } catch (error) {
        console.log("Error while registering user\n", {message: error});
        return res.status(500).json({
            error: "Error while registering user",
            message: error
        })
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // TODO: implement login logic
    } catch (error) {
        console.log("Error in login\n", {message: error});
        return res.status(500).json({
            error: "Error while logging in",
            message: error
        })
    }
};

export const authStatus = async (req: Request, res: Response) => {
    try {
        // TODO: implement auth status logic
    } catch (error) {
        console.log("Error in authStatus\n", {message: error});
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        // TODO: implement logout logic
    } catch (error) {
        console.log("Error in logout\n", {message: error});
    }
};

export const setup2FA = async (req: Request, res: Response) => {
    try {
        // TODO: implement 2FA setup logic
    } catch (error) {
        console.log("Error in setup2FA\n", {message: error});
    }
    };

export const verify2FA = async (req: Request, res: Response) => {
    try {
        // TODO: implement 2FA verification logic
    } catch (error) {
        console.log("Error in verify2FA\n", {message: error});
    }
};

export const reset2FA = async (req: Request, res: Response) => {
    try {
        // TODO: implement 2FA reset logic
    } catch (error) {
        console.log("Error in reset2FA\n", {message: error});
    }
};
