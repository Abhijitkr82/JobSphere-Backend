const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
  try {
    console.log("User Data:", req.user);
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
    title,
    company,
    location,
    salary,
    description,
    createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Application = require("../models/Application");

const getDashboardStats = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.id,
    });

    const jobIds = jobs.map((job) => job._id);

    const totalJobs = jobs.length;

    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const acceptedApplicants =
      await Application.countDocuments({
        job: { $in: jobIds },
        status: "accepted",
      });

    const pendingApplicants =
      await Application.countDocuments({
        job: { $in: jobIds },
        status: "pending",
      });

    res.status(200).json({
      success: true,
      totalJobs,
      totalApplicants,
      acceptedApplicants,
      pendingApplicants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  getMyJobs,
  getDashboardStats,
};