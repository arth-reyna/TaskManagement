import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task_title: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 40,
      trim: true,
    },

    task_description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },

    status: {
      type: Boolean,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, strict: false },
);

export const Task = mongoose.model("Task", taskSchema);
