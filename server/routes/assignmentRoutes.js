const router = require("express").Router();
const prisma = require("../src/utils/prisma");

router.post("/create", upload.single("pdf"), async (req, res) => {
    const { name, courseId, deadline } = req.body;
    const cloudinaryUrl = req.file.path;
    const publicId = req.file.filename;

    try {
        const video = await prisma.assignment.create({
            data: {
                id: publicId,
                name,
                deadline,
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

router.post("/submit", upload.single("pdf"), async (req, res) => {
    const { assignmentId, studentId } = req.body;
    const cloudinaryUrl = req.file.path;
    const publicId = req.file.filename;

    try {
        const newSubmission = await prisma.submission.create({
            data: {
                id: publicId,
                url: cloudinaryUrl,
                assignment: {
                    connect: { id: assignmentId },
                },
                student: {
                    connect: { id: studentId },
                },
            },
        });

        res.status(201).json({
            message: "Submission uploaded and stored successfully",
            submission: newSubmission,
        });
    } catch (error) {
        console.error("Error storing submission:", error);
        res.status(500).json({ error: "Failed to store submission metadata" });
    }
});

module.exports = router;
