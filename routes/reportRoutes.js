const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
const { createReport, getReports, deleteReport } = require('../controllers/reportController');

router.get('/', getReports);
router.post('/',  createReport);
router.delete('/:id',  deleteReport);

module.exports = router;