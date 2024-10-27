const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
    log: [
        { emit: "stdout", level: "info" },
        {
            emit: "stdout",
            level: "error",
        },
    ],
});

prisma.$on("prisma:connected", (event) => {
    console.log(`PrismaClient connected to datasource ${event.datasource}`);
});

module.exports = prisma;
