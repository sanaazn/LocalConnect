const Report = require('../models/Report');

const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('createdBy', 'username');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports', error: err.message });
  }
};

const createReport = async (req, res) => {
  try {
    const { title, description, category, location, timestamp } = req.body;
    console.log(req.user);  // Check if userId is attached to req.user

    const report = await Report.create({
      title,
      description,
      category,
      location,
      timestamp,
      createdBy: req.user.userId  // The userId from the JWT token
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Error creating report', error: err.message });
  }
};


const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    // Optional: check if the user is the owner
    if (report.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await report.remove();
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting report', error: err.message });
  }
};

module.exports = { getReports, createReport, deleteReport };
