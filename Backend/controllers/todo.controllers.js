import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(201).json({
        success: false,
        error: "todo is required",
      });
    const isTodoExist = await Todo.findOne({ text ,isDeleted:false });
    if (isTodoExist) {
      res.status(404).json({
        success: false,
        error: "Todo already exist",
      });
    } else {
      const newTodo = new Todo({
        text,
      });

      await newTodo.save();
      const allTodos=await Todo.find({isDeleted:false});
      return res.status(201).json({
        success: true,
        allTodos:allTodos,
        message: "todo created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { todoId, newTodoText } = req.body;
    if (!todoId || !newTodoText) {
      return res
        .status(404)
        .json({ success: false, error: "All fields are required." });
    }
    const updateTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        text: newTodoText,
      },
      { new: true }
    );
    const allTodos=await Todo.find({});
    return res.status(201).json({
      success: true,
      allTodos,
      message: "Todo Update Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({isDeleted:false});
    return res.status(201).json({ success: true, todos });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};

export const deleteTodo = async(req, res) => {
  try {
    const {todoId}=req.body;
    if(!todoId){
      return res.status(404).json({
        success:false,
        error:"Todo is is required"
      })
    }
    await Todo.findByIdAndUpdate(todoId, {isDeleted:true});
    const allTodos=await Todo.find({isDeleted:false});
    return res.json({
      success:true,
      allTodos,
      message:"todo deleted successfully."
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};
