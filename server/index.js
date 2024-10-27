require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const teacherRoutes = require("./routes/teacherRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const contentRoutes = require("./routes/contentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const quizRoutes = require("./routes/quizRoute");
const studentRoutes = require("./routes/studentRoutes");
const submissiosRoutes = require("./routes/submissionRoutes");
const videoRoutes = require("./routes/videoRoutes");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT_NUMBER || 5000;

app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173", // React app URL
        credentials: true, // Allow cookies
    })
);
app.use(express.json());

app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);
app.use("/course", courseRoutes);
app.use("/video", videoRoutes);
app.use("/content", contentRoutes);
app.use("/submission", submissiosRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/quiz", quizRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
