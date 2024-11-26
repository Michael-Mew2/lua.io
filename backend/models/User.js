import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  // General Account Info
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthdate: Date,
  country: String,
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  profilePic: String,
  color: String,

  // Specific site info:
  tokens: {
    type: Number,
    default: 0,
  },
  suggestedSongs: [{ type: String }],
  listenedSongs: [{ songId: String, neverHeardBefore: Boolean, rank: Number }],

  // Email-validation
  validationToken: String,
  emailValidated: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.authenticate = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = model("User", userSchema);

export default User;
