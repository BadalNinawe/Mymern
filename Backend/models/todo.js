import mongoose, { mongo } from "mongoose";
const todoSchema = new mongoose.Schema({
  text: String,
  isDeleted: { type: Boolean, default: false }
  
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
