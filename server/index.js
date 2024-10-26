require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT_NUMBER || 5000;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "lms-videos",
        resource_type: "video",
    },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
