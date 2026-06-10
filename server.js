const express = require("express")
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const applicationRoutes = require("./routes/applicationRoutes");
require("dotenv").config()

const connectDB = require("./config/db")
const aiRoutes = require("./routes/aiRoutes");

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/ai", aiRoutes);
app.get("/", (req, res) => {
  res.send("API Running Successfully")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})