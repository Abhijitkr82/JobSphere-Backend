const express = require("express");
const router = express.Router()

console.log("Auth Routes Loaded");

const authMiddleware = require("../middleware/authMiddleware");;



const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

router.get("/", (req, res) => {
  res.send("Auth Root Working");
});

router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = router;