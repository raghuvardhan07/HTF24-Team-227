const router = require("express").Router();
const prisma = require("../src/utils/prisma");
const upload = require("../middlewares/upload");

router.post("/upload", upload.single("video"), async (req, res) => {
    const { title, description, courseId } = req.body;
    const cloudinaryUrl = req.file.path;
    const publicId = req.file.filename;

    try {
        const video = await prisma.video.create({
            data: {
                id: publicId,
                title,
                description,
                url: cloudinaryUrl,
                courseId,
            },
        });

        res.status(201).json({
            message: "Video uploaded and metadata stored successfully",
            video: video,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to store video metadata" });
    }
});

module.exports = router;
