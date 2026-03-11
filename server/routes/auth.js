const express = require('express');
const router = express.Router();
const { registerUser, authUser, logoutUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
