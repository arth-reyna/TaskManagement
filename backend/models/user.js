import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      minlength: 4,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true },
);

export default User = mongoose.model("User", userSchema);