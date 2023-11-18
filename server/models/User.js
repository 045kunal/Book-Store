const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  emailid: {
    type: String,
    required: true,
    unique: true,
  },
  mobileno: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRoles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRole",
      enum: ["employee", "engineer", "manager"],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
