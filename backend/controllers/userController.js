import User from "../models/User.js";
import { generateToken } from "../middleware/jwt.js";
import nodemailer from "nodemailer";
import { sendVerificationMail } from "../services/nodemailer.js";

export async function createUser(req, res) {
    try {
        console.log("request Body:", req.body);
        const {username, email} = req.body
        console.log({username, email});
        
        const existingUser = await User.findOne({username, email});
        
        
        if(existingUser) {
            console.log("User already exists");
            
            return res.status(409).json({msg: "User already exists"})
        }
        
        const newUser = await User.create(req.body);
        console.log(newUser);
        const token = generateToken(newUser.id)

        console.log(token);
        
        // await sendVerificationMail(newUser);
        res.cookie("jwt", token, {httpOnly:false, secure: false, maxAge: 60*60*1000}).status(201).json({msg: "User was created", newUser}) // Hier wird ein Cookie erstellt, damit man nach dem einloggen sofort auf das Dashboard kommt, für die Zukunft rausnehmen!!
    } catch (error) {
        res.status(500).json({msg: "Creating User was unsuccessful!"})
    }
}

export async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({msg: "User not found!"});

        // if(!user.emailValidated) return res.status(403).json({msg: "You need to verify your Email before you can log in!"})

        const passwordMatch = user.authenticate(password);

        if(!passwordMatch) return res.status(401).json({msg: "Login doesn't match!"})

        const token = generateToken({userId: user._id});

        return res.status(200).cookie("jwt", token, {httpOnly:false, secure: false, maxAge: 60*60*1000}).json({msg: "Login successful"});
    } catch (error) {
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