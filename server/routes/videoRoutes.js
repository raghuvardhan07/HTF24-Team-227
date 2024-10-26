const router = require("express").Router();
const prisma = require("../src/utils/prisma");

// Basic CRUD
router.post("/upload", upload.single("video"), async (req, res) => {
    const { title, description } = req.body;
    const { path: cloudinaryUrl, filename: publicId } = req.file;

    try {
        const video = await prisma.video.create({
            data: {
                title,
                description,
                cloudinaryUrl,
                publicId,
            },
        });

        res.status(201).json({
            message: "Video uploaded and metadata stored successfully",
            videoId: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to store video metadata" });
    }
});
