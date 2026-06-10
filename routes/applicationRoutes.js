const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  applyJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// Only Jobseeker can apply
router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware("jobseeker"),
  applyJob
);

// My Applications
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("jobseeker"),
  getMyApplications
);
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("recruiter"),
  getJobApplications
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateApplicationStatus
);

module.exports = router;