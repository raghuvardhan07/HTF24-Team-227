const router = require("express").Router();
const prisma = require("../src/utils/prisma");
const upload = require("../middlewares/upload");

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

// Gets one specific assignment details
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const assignment = await prisma.assignment.findOne({
            where: {
                id: id,
            },
            include: {
                student: true,
                assignment: true,
            },
        });
        res.status(200).json({ assignment: assignment });
    } catch (error) {
        console.error("Error retreiving assignment:", error);
        res.status(500).json({ error: "Failed to store assignment metadata" });
    }
});

router.get("/:id/submissions", async (req, res) => {
    const id = req.params.id;
    try {
        const submissions = await prisma.submission.findMany({
            where: {
                assignment: {
                    id: id,
                },
            },
            include: {
                student: true,
                assignment: true,
            },
        });
        res.status(200).json({ submissions: submissions });
    } catch (error) {
        console.error("Error retreiving submission:", error);
        res.status(500).json({ error: "Failed to store submission metadata" });
    }
});

router.get("/:id/submission/:subId", async (req, res) => {
    const id = req.params.id;
    const subId = req.params.subId;
    try {
        const submission = await prisma.submission.findOne({
            where: {
                id: subId,
                assignment: {
                    id: id,
                },
            },
            include: {
                student: true,
                assignment: true,
            },
        });
        res.status(200).json({ submission: submission });
    } catch (error) {
        console.error("Error retreiving submission:", error);
        res.status(500).json({ error: "Failed to store submission metadata" });
    }
});

module.exports = router;
