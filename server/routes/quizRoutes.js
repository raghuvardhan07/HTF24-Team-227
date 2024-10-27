const router = require("express").Router();
const prisma = require("../src/utils/prisma");

// Create a new quiz
router.post("/create", async (req, res) => {
    const { name, courseId, questionAnswers } = req.body;

    try {
        // Create a new quiz and associate it with a course
        const newQuiz = await prisma.quiz.create({
            data: {
                name,
                questionAnswers, // Map
                course: {
                    connect: { courseId }, // Connect the quiz to the course
                },
            },
        });

        res.status(201).json({
            message: "Quiz created successfully",
            quiz: newQuiz,
        });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ error: "Failed to create quiz" });
    }
});

// Get all quizzes
router.get("/", async (req, res) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            include: {
                course: true, // Include course details
            },
        });

        res.status(200).json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
});

// Get a specific quiz by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const quiz = await prisma.quiz.findUnique({
            where: { id },
            include: {
                course: true, // Include course details
            },
        });

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        res.status(200).json(quiz);
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ error: "Failed to fetch quiz" });
    }
});

// Update a quiz by ID
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, questionAnswers } = req.body;

    try {
        const updatedQuiz = await prisma.quiz.update({
            where: { id },
            data: {
                name,
                questionAnswers,
                updatedAt: new Date(),
            },
        });

        res.status(200).json({
            message: "Quiz updated successfully",
            quiz: updatedQuiz,
        });
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ error: "Failed to update quiz" });
    }
});

// Delete a quiz by ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.quiz.delete({
            where: { id },
        });

        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ error: "Failed to delete quiz" });
    }
});

module.exports = router;
