const router = require("express").Router();
const prisma = require("../src/utils/prisma"); // Import Prisma from your utils folder

// Create a new student
router.post("/create", async (req, res) => {
    const { studentName, studentAge, phoneno, email, password, profilePhoto } = req.body;

    try {
        // Create a new student
        const newStudent = await prisma.student.create({
            data: {
                studentName,
                studentAge,
                phoneno,
                email,
                password,
                profilePhoto,
            }
        });

        res.status(201).json({
            message: "Student created successfully",
            student: newStudent
        });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ error: "Failed to create student" });
    }
});

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await prisma.student.findMany({
            include: {
                courses: true, // Include course details
            },
        });

        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

// Get a specific student by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const student = await prisma.student.findUnique({
            where: { id },
            include: {
                courses: true, // Include course details
            },
        });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ error: "Failed to fetch student" });
    }
});

// Update a student by ID
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { studentName, studentAge, phoneno, email, password, profilePhoto } = req.body;

    try {
        const updatedStudent = await prisma.student.update({
            where: { id },
            data: {
                studentName,
                studentAge,
                phoneno,
                email,
                password,
                profilePhoto,
                updatedAt: new Date()
            }
        });

        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent
        });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Failed to update student" });
    }
});

// Delete a student by ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.student.delete({
            where: { id }
        });

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ error: "Failed to delete student" });
    }
});

module.exports = router;
