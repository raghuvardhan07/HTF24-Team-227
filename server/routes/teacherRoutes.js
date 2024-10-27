const router = require("express").Router();
const prisma = require("../src/utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth");

// Basic CRUD
router.post("/create", async (req, res) => {
    const { name, age, phone, email, password } = req.body;
    // Courses is ommited becoz during creation of Teacher account there are no courses of them
    const exists = await prisma.teacher.findUnique({
        where: {
            email: email,
        },
    });
    if (exists) {
        return res.status(400).json({ message: "Teacher already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = await prisma.teacher.create({
        data: {
            teacherName: name,
            teacherAge: Number(age),
            phoneno: Number(phone),
            email,
            password: hashedPassword,
        },
    });

    return res.status(201).json(teacher.id);
});

router.get("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const teacher = await prisma.teacher.findUnique({
        where: {
            id: id,
        },
    });
    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }
    return res.status(200).json(teacher);
});

router.get("/:id/courses", authMiddleware, async (req, res) => {
    const id = req.params.id;
    // Find all courses corresponding to this particular teacher
    const courses = await prisma.course.findMany({
        where: {
            teacherId: id, // Use the dynamic teacher ID from the request params
        },
        include: {
            student: true, // Include student details related to the course
        },
    });
    return res.status(200).json(courses);
});

router.patch("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    const teacher = await prisma.teacher.findUnique({
        where: {
            id: id,
        },
    });
    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }
    const updatedTeacher = await prisma.teacher.update({
        where: { id: id },
        data: newData,
    });

    return res.status(200).json(updatedTeacher);
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const teacher = await prisma.teacher.findUnique({
        where: {
            id: id,
        },
    });
    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }
    const deletedTeacher = await prisma.teacher.delete({ where: { id: id } });

    return res.status(200).json(deletedTeacher);
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const teacher = await prisma.teacher.findUnique({
        where: {
            email: email,
        },
    });
    if (!teacher) {
        return res.status(400).json({ message: "Teacher not found" });
    }
    const comp = await bcrypt.compare(password, teacher.password);
    if (!comp) {
        return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign(teacher.id, process.env.JWT_SECRET);
    console.log(token);
    return res
        .status(200)
        .cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false })
        .json({ message: "Logged in successfully", teacherId: teacher.id });
});

module.exports = router;
