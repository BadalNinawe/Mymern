

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");

  async function getTodos() {
    try {
      const response = await axios.get("http://localhost:3001/api/todo/get-todo");
      if (response.data.success) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch todos.");
    }
  }

  async function createTodo() {
    try {
      const response = await axios.post("http://localhost:3001/api/todo/create-todo", { text: newTodo });
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos([...todos, response.data.newTodo]);
        setNewTodo("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error adding todo.");
    }
  }

  async function DeleteTodo(id) {
    try {
      const response = await axios.delete("http://localhost:3001/api/todo/delete-todo", { data: { todoId: id } });
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos(todos.filter(todo => todo._id !== id));
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error deleting todo.");
    }
  }

  async function EditTodo() {
    try {
      const response = await axios.put("http://localhost:3001/api/todo/update-todo", { 
        todoId: editTodo, 
        newTodoText: editedTodo 
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos(todos.map(todo => todo._id === editTodo ? { ...todo, text: editedTodo } : todo));
        setEditTodo("");  
        setEditedTodo("");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error updating todo.");
    }
  }

  function handleEdit(id, text) {
    setEditTodo(id);
    setEditedTodo(text);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h2>Todo App</h2>
      <input 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Enter new todo"
      />
      <button onClick={createTodo}>Add Todo</button>

      {todos.length > 0 ? (
        todos.map((todo, i) => (
          <div
            key={todo._id}
            style={{
              display: "flex",
              width: "50%",
              border: "2px solid black",
              margin: "auto",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "10px"
            }}
          >
            {editTodo === todo._id ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button onClick={EditTodo}>Submit</button>
              </>
            ) : (
              <>
                <h3 style={{ width: "50%", textAlign: "center" }}>
                  {i + 1}. {todo.text}
                </h3>
                <button style={{ width: "20%" }} onClick={() => handleEdit(todo._id, todo.text)}> Edit</button>
                <button
                  onClick={() => DeleteTodo(todo._id)}
                  style={{ width: "20%" }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No todos available.</p>
      )}
    </div>
  );
};

export default App;