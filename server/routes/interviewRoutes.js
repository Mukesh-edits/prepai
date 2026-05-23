const express = require('express');
const router = express.Router();
const { evaluateAnswer, saveInterview, getInterviews } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/evaluate', protect, evaluateAnswer);
router.post('/save', protect, saveInterview);
router.get('/history', protect, getInterviews);

module.exports = router;