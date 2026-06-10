const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  getMyJobs,
  getDashboardStats,
} = require("../controllers/jobController");

// Public Routes
router.get("/", getAllJobs);

// Recruiter My Jobs
router.get(
  "/my-jobs",
  authMiddleware,
  roleMiddleware("recruiter"),
  getMyJobs
);
router.get(
  "/dashboard-stats",
  authMiddleware,
  roleMiddleware("recruiter"),
  getDashboardStats
);

// Single Job
router.get("/:id", getSingleJob);

// Recruiter Only Routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  createJob
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateJob
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  deleteJob
);

module.exports = router;