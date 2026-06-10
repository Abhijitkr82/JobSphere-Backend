const Application = require("../models/Application");

// Apply Job
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Application Submitted Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My Applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Recruiter - View Applicants of a Job
const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    }).populate("applicant", "-password");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Application Status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application Status Updated",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
};