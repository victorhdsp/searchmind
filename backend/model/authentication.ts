import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function login(email:string) {
    const user = await prisma.user.findUnique({
        where: {email},
        include: {
            config: true,
            questions: true,
            responses: true
        }
    });
    if (!user) throw new Error("Email or Password is wrong");
    return user
}

async function resetPassword(email:string, password: string) {
    const user = await prisma.user.update({
        where: { email },
        data: { password }
    })
    if (!user) throw new Error("User not exist");
    return user
}

async function signup(email:string, password: string) {
    let user = await prisma.user.findUnique({where: {email}});
    if (user) throw new Error("User already exist");
    user = await prisma.user.create({
        data: {
            email,
            password,
            config: {
                create: {
                    question_hours: ["13:00"]
                }
            }
        },
        include: {
            config: true,
            questions: true,
            responses: true
        }
    })
    if (!user) throw new Error("Error to create user");
    return user
}

export default {
    login,
    resetPassword,
    signup
}