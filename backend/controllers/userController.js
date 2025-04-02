import User from "../models/User.js";
import { generateToken } from "../middleware/jwt.js";
import nodemailer from "nodemailer";
import { sendVerificationMail } from "../services/nodemailer.js";
import { verifyToken } from "../middleware/jwt.js";

export async function createUser(req, res) {
    try {
        console.log("request Body:", req.body);
        const {username, email} = req.body
        console.log({username, email});
        

        const existingUser = await User.findOne({email});
        const usernameUsed = await User.findOne({username});
        
        
        if(existingUser) {
            console.log("User already exists");
            
            return res.status(409).json({msg: "User already exists"})
        }

        if(usernameUsed) {
            console.log("Username already taken");
            
            return res.status(226).json({msg: "Username already taken"})
        }
        
        const newUser = await User.create(req.body);
        console.log("newuser:", newUser);
        const token = generateToken({userId: newUser.id})

        console.log(token);
        
        // await sendVerificationMail(newUser);
        res.cookie("jwt", token, {httpOnly:true, secure: true, sameSite: "lax", maxAge: 60*60*1000}).status(201).json({msg: "User was created", newUser}) // Hier wird ein Cookie erstellt, damit man nach dem einloggen sofort auf das Dashboard kommt, für die Zukunft rausnehmen!!
    } catch (error) {
        console.log("error in createUser:", error);
        
        res.status(500).json({msg: "Creating User was unsuccessful!"})
    }
}

export async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({msg: "User not found!"});

        // if(!user.emailValidated) return res.status(403).json({msg: "You need to verify younoner Email before you can log in!"})

        const passwordMatch = user.authenticate(password);

        if(!passwordMatch) return res.status(401).json({msg: "Login doesn't match!"})

        const token = generateToken({userId: user._id});

        return res.status(200).cookie("jwt", token, {httpOnly:true, secure: true, sameSite: "lax", maxAge: 60*60*1000}).json({msg: "Login successful", user: {id: user._id, username: user.username, email: user.email, profilePic: user.profilePic, color:user.color, tokens: user.tokens}});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({msg: "Server error"})
    }
}

export async function verifyEmail(req, res) {
    try {
        const {token} = req.params;

        if(!token) return res.status(400).json({msg:"No Token!"})

        const user = await User.findOne({validationToken: token});

        if(user) {
            user.emailValidated = true;
            user.validationToken = null
            await user.save();
            return res.status(200).json({msg: "Email was successfully verified!", emailValidated:user.emailValidated})
        } else {
            return res.status(401).json({msg: "Invalid Token!"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server Error at Email Verification!"})
    }
} 

export async function checkAuthStatus(req, res) {
    try {
        console.log("Check if cookies (userController.js):", req.cookies, "headers.auth:", req.headers.authorization?.split(' '));
        
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        console.log("Check Token:", token);
        
        if(!token) return res.status(401).json({msg:"No token provided!"})

        const decoded = verifyToken(token);
        if(!decoded) return res.status(401).json({msg: "Invalid token!"});

        const user = await User.findById(decoded.userId);
        if(!user) return res.status(404).json({msg: "User not found!"})

        return res.status(200).json({msg: "Authenticated", user})
    } catch (error) {
        console.error("Auth check error:", error);
        res.status(500).json({ msg: "Error checking authentication!" });
    }
}
