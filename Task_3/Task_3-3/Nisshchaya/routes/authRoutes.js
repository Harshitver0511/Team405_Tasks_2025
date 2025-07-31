const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { register, login, profile } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile);

module.exports = router;
