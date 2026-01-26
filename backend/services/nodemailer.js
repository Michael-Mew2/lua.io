import crypto from "node:crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import { error } from "node:console";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendVerificationMail(user, token) {
  try {
    const verificationLink = `${process.env.SITE_URL}/verify-email?token=${token}`;  //ändern sobald in react!!

    const mailOptions = {
      from: `"🌙 lua.io"<${process.env.EMAIL}>`,
      to: user.email,
      subject: `👋 Hey ${user.username}, verify your Email-Address!`,
      html: `
        <p>Welcome, ${user.username}!</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>If you did not create this account, you can ignore this email.</p>
        `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error sending verification email!");
      } else {
        console.log("Email sent:", info.response);
        return res
          .status(201)
          .json({
            msg: "User created. A verification email has been sent!",
            newUser,
          });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error!" });
  }
}
