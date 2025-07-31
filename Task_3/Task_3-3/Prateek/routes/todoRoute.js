import express from 'express';
import { createTodo, deleteTodo, fetchOneTodo, fetchTodos, updateTodo } from '../controllers/todoController.js';
import { userMiddleware } from '../middleware/userMiddleware.js';
const router = express.Router();

router.post('/',userMiddleware,createTodo);
router.get('/',userMiddleware,fetchTodos);
router.get('/:id',userMiddleware,fetchOneTodo);
router.put('/:id',userMiddleware,updateTodo);
router.delete('/:id',userMiddleware,deleteTodo);

export default router;