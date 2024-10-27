const router = require("express").Router();
const prisma = require("../src/utils/prisma");
const upload = require("../middlewares/upload");

// Create a new course
router.post("/create", upload.single("jpg"), async (req, res) => {
    const {
        courseName,
        courseDescription,
        studentIds, // Empty at start
        teacherId,
    } = req.body;

    const cloudinaryUrl = req.file.path;

    try {
        // Create the course with relations to teacher and students
        const newCourse = await prisma.course.create({
            data: {
                courseName,
                courseDescription,
                thubmnailUrl: cloudinaryUrl,
                teacher: {
                    connect: { id: teacherId }, // Associate with an existing teacher
                },
                student: {
                    connect: studentIds.map((id) => ({ id })), // Connect multiple students
                },
            },
        });

        res.status(201).json({
            message: "Course created successfully",
            course: newCourse,
        });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Failed to create course" });
    }
});

router.post("/enroll", async (req, res) => {
    const { courseId, studentId } = req.body;

    try {
        const course = await prisma.course.findUnique({
            where: { courseId: courseId },
            select: { studentId: true },
        });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (course.studentId.includes(studentId)) {
            return res.status(400).json({ error: "Student is already enrolled in this course" });
        }

        const updatedCourse = await prisma.course.update({
            where: { courseId: courseId },
            data: {
                studentId: { push: studentId }, // Push the new student ID into the array
            },
            include: { student: true },
        });

        res.status(200).json({
            message: "Student added to course successfully",
            course: updatedCourse,
        });
    } catch (error) {
        console.error("Error adding student to course:", error);
        res.status(500).json({ error: "Failed to add student to course" });
    }
});

// Get all Assignments
router.get("/:id/assignments", async (req, res) => {
    const id = req.params.id;
    try {
        const course = await prisma.course.findUnique({
            where: { id: id },
            select: { assignments: true },
        });
        res.status(200).json(course.assignments);
    } catch (error) {
        console.error("Error fetching course assignments:", error);
        res.status(500).json({ error: "Failed to fetch course assignments" });
    }
});

// Get all PDFs
router.get("/:id/content", async (req, res) => {
    const id = req.params.id;
    try {
        const course = await prisma.course.findUnique({
            where: { id: id },
            select: { content: true },
        });
        res.status(200).json(course.content);
    } catch (error) {
        console.error("Error fetching course content:", error);
        res.status(500).json({ error: "Failed to fetch course content" });
    }
});

module.exports = router;
