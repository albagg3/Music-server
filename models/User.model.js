const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'username is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minLength: [6, 'Password must be at least 6 characters long.']
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
