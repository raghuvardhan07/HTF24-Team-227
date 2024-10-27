const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "lms-videos",
        resource_type: "video",
    },
});

export const upload = multer({ storage });
