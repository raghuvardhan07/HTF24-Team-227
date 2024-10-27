const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "lms-videos",
        resource_type: "video",
    },
});
const upload = multer({ storage });
module.exports = upload;
