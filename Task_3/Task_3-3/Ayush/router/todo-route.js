import {Router} from 'express'
import { addTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from '../controles/todo-controle.js'
import verifyJWT from '../middleware/auth.js'

const router = Router()

router.route('/').post(verifyJWT, addTodo)
router.route('/').get(verifyJWT, getAllTodos)
router.route('/:id').get(verifyJWT, getTodo)
router.route('/:id').put(verifyJWT, updateTodo)
router.route('/:id').delete(verifyJWT, deleteTodo)

export default router
