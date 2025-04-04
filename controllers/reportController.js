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
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user is authorized to delete this report
    if (report.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this report' });
    }

    // Use findByIdAndDelete instead of remove()
    await Report.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    console.error('Error in deleteReport:', err);
    res.status(500).json({ message: 'Error deleting report', error: err.message });
  }
};

const modifyReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    if (report.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: 'Error updating report', error: err.message });
  }
};

module.exports = {
  getReports,
  createReport,
  deleteReport,
  modifyReport,
};


