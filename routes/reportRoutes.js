const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');  // Import the middleware
const { createReport, getReports, deleteReport } = require('../controllers/reportController');

router.get('/', getReports);
router.post('/', auth, createReport);  // Use the auth middleware for creating reports
router.delete('/:id', auth, deleteReport); 

module.exports = router;