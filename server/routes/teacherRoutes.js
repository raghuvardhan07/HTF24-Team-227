const router = require("express").Router();
const prisma = require("../src/utils/prisma");

// Basic CRUD
router.post("/", async (req, res) => {
    const { id, teacherName, teacherAge, phoneno, email, password, profilePhoto } = req.body;
    // Courses is ommited becoz during creation of Teacher account there are no courses of them

    const exists = await prisma.teacher.findUnique();

    const teacher = await prisma.student.create({
        id,
        teacherName,
        teacherAge,
        phoneno,
        email,
        password,
        profilePhoto,
    });
});
