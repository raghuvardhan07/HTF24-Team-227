const router = require("express").Router();
const prisma = require("../src/utils/prisma"); 

// Create a new submission
router.post("/create", async (req, res) => {
    const { assignmentId, studentId, url } = req.body;

    try {
        // Create a new submission and associate it with an assignment and student
        const newSubmission = await prisma.submission.create({
            data: {
                assignmentId,
                student: {
                    connect: { id: studentId } // Connect the submission to the student
                },
                url
            }
        });

        res.status(201).json({
            message: "Submission created successfully",
            submission: newSubmission
        });
    } catch (error) {
        console.error("Error creating submission:", error);
        res.status(500).json({ error: "Failed to create submission" });
    }
});

// Get all submissions
router.get("/", async (req, res) => {
    try {
        const submissions = await prisma.submission.findMany({
            include: {
                assignment: true, // Include assignment details
                student: true     // Include student details
            }
        });

        res.status(200).json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
});

// Get a specific submission by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const submission = await prisma.submission.findUnique({
            where: { id },
            include: {
                assignment: true, // Include assignment details
                student: true     // Include student details
            }
        });

        if (!submission) {
            return res.status(404).json({ error: "Submission not found" });
        }

        res.status(200).json(submission);
    } catch (error) {
        console.error("Error fetching submission:", error);
        res.status(500).json({ error: "Failed to fetch submission" });
    }
});

// Update a submission by ID
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;

    try {
        const updatedSubmission = await prisma.submission.update({
            where: { id },
            data: {
                url,
                updatedAt: new Date()
            }
        });

        res.status(200).json({
            message: "Submission updated successfully",
            submission: updatedSubmission
        });
    } catch (error) {
        console.error("Error updating submission:", error);
        res.status(500).json({ error: "Failed to update submission" });
    }
});

// Delete a submission by ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.submission.delete({
            where: { id }
        });

        res.status(200).json({ message: "Submission deleted successfully" });
    } catch (error) {
        console.error("Error deleting submission:", error);
        res.status(500).json({ error: "Failed to delete submission" });
    }
});

module.exports = router;
