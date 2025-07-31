const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
    createTodo, getTodos, getTodoById, updateTodo, deleteTodo
} = require('../controllers/todoController');

router.post('/', auth, createTodo);
router.get('/', auth, getTodos);
router.get('/:id', auth, getTodoById);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);

module.exports = router;
