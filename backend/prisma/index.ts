import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.$connect();
    const users = await prisma.user.findMany()
    // console.log(users);
}

main().then(() => {
    prisma.$disconnect()
}).catch(error => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
})

export default prisma;