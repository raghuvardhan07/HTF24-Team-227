const router = require("express").Router();
const prisma = require("../src/utils/prisma");

// Create a new course
router.post("/create", async (req, res) => {
    const {
        courseName,
        courseDescription,
        studentIds, // Empty at start
        teacherId,
    } = req.body;

    try {
        // Create the course with relations to teacher and students
        const newCourse = await prisma.course.create({
            data: {
                courseName,
                courseDescription,
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

module.exports = router;
