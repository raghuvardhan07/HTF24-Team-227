const router = require("express").Router();
const prisma = require("../src/utils/prisma");

// Basic CRUD
router.post("/", async (req, res) => {
    const { id, teacherName, teacherAge, phoneno, email, password } = req.body;
    // Courses is ommited becoz during creation of Teacher account there are no courses of them
    const exists = await prisma.teacher.findUnique({
        where: {
            id: id,
        },
    });
    if (exists) {
        return res.status(400).json({ message: "Teacher already exists" });
    }
    const teacher = await prisma.student.create({
        id,
        teacherName,
        teacherAge,
        phoneno,
        email,
        password,
    });

    return res.status(201).json(id);
});

router.get(":id", async (req, res) => {
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

router.patch(":id", async (req, res) => {
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

router.delete(":id", async (req, res) => {
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

module.exports = router;
