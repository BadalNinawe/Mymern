import {Router} from 'express';
import { createTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todo.controllers.js';
const router=Router();
router.post('/create-todo',createTodo);
router.put('/update-todo',updateTodo);
router.delete('/delete-todo',deleteTodo);
router.get('/get-todo',getTodo);

export default router;

