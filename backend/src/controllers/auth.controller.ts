import type { Request, Response } from "express";
import { User } from "../models/user.model.ts";
import speakeasy from 'speakeasy';
import qrCode from 'qrcode';
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password} = req.body;

        const existingUser = await User.findOne({ username });
        if(existingUser) return res.status(409).json({message: "Username alredy taken"});
        
        const newUser = new User({
            username, 
            password,
        });
        await await newUser.save();

        const createdUser = await User.findById(newUser._id).select("-password");

        console.log("New User: ", createdUser);
        return res.status(201).json({message: 'User register successfully', user: createdUser});
    } catch (error) {
        console.log("Error while registering user\n", {message: error});
        return res.status(500).json({
            error: "Error while registering user",
            message: error
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        if(!req.user) return res.status(401).json({ error: "Not authenticated"});

        console.log("Authenticated user: ", {
            username: req.user.username,
            isMfaActive: req.user.isMfaActive,
        });
        return res.status(200).json({
            message: "User logged in successfully", 
            username: req.user.username,
            isMfaActive: req.user.isMfaActive,
        });
    } catch (error) {
        console.log("Error in login\n", {message: error});
        return res.status(500).json({
            error: "Error while logging in",
            message: error
        });
    }
};

export const authStatus = async (req: Request, res: Response) => {
    try {
        if(req.user) {
            return res.status(200).json({
                message: "User logged in successfully", 
                username: req.user.username,
                isMfaActive: req.user.isMfaActive,
            });
        } else {
            return res.status(401).json({
                message: "Unauhtorize user"
            });
        }
    } catch (error) {
        console.log("Error in authStatus\n", {message: error});
        return res.status(500).json({
            error: "Error while getting auth status",
            message: error
        });       
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        if(!req.user) return res.status(401).json({ message: "Unauthorized user"});
        req.logout((error) => {
            if(error) return res.status(400).json({ message: "User no t logged in" })
            return res.status(200).json({ message: "Logout successful"});
        });
    } catch (error) {
        console.log("Error in logout\n", {message: error});
        return res.status(500).json({
            error: "Error while logging out",
            message: error
        });
    }
};

export const setup2FA = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if(!user) return res.status(401).json({ message: "Unauthorized: Login to setup 2FA"});
        
        var secret = speakeasy.generateSecret();
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();

        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: `${req.user?.username}`,
            issuer: "2sure",
            encoding: "base32"
        });

        const qrImageUrl = await qrCode.toDataURL(url);
        return res.status(200).json({
            //secret: secret.base32,
            qrCode: qrImageUrl
        });  
    } catch (error) {
        console.log("Error in setup2FA\n", {message: error});
        return res.status(500).json({
            error: "Error setting up 2FA",
            message: error
        });
    }
};

export const verify2FA = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const user = req.user;
        console.log("token: ", token);

        if(!user) return res.status(400).json({ message: "User doesnot have 2FA setup" });

        console.log("user: ", user);
        const secret = user.twoFactorSecret;
        console.log("secret: ", secret);
        const isVerified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: "base32",
            token: token.toString(),
            window: 2,
            step: 30
        });

        console.log("isverfied: ", isVerified);

        if(isVerified) {
            const jwtSecret = process.env.JWT_SECRET;
            if(!jwtSecret) throw new Error("JWT_SECRET is undefined in env");

            const jwtToken = jwt.sign({ 
                username: user.username,
                userId: user._id
            },
                jwtSecret,
                {expiresIn: "1h"}
            );

            return res.status(200).json({
                message: "2FA successful", 
                token: jwtToken
            });
        } else {
            return res.status(400).json({
                message: "Invalid 2FA token"
            });
        }
    } catch (error) {
        console.log("Error in verify2FA\n", {message: error});
        return res.status(500).json({
            error: "Error while verifying",
            message: error
        });
    }
};

export const reset2FA = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if(!user) return res.status(400).json({ message: "User doesnot have 2FA setup" });

        user.twoFactorSecret = "",
        user.isMfaActive = false;
        await user.save();
        res.status(200).json({ message: "2FA reset successful" }); 
    } catch (error) {
        console.log("Error in reset2FA\n", {message: error});
        return res.status(500).json({
            error: "Error reseting 2FA",
            message: error
        })
    }
};
