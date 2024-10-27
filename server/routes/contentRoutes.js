const router = require("express").Router();
const prisma = require("../src/utils/prisma");
const upload = require("../middlewares/upload");

// Upload PDF
router.post("/upload", upload.single("file"), async (req, res) => {
    const { courseId, name } = req.body;
    const cloudinaryUrl = req.file.path;
    const publicId = req.file.filename;

    try {
        const content = await prisma.content.create({
            data: {
                id: publicId,
                url: cloudinaryUrl,
                name,
                course: {
                    connect: { courseId: courseId }, // Connects the content to a course
                },
            },
        });

        res.status(201).json({
            message: "File uploaded and content metadata stored successfully",
            content: content,
        });
    } catch (error) {
        console.error("Error storing content metadata:", error);
        res.status(500).json({ error: "Failed to store content metadata" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const content = await prisma.content.findUnique({ where: { id: id } });
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }
        res.status(200).json({ content: content });
    } catch (error) {
        console.error("Error retreiving content :", error);
        res.status(500).json({ error: "Failed to retreive content" });
    }
});

module.exports = router;
