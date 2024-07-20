import { PrismaClient } from "@prisma/client";

class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async login(email:string) {
        const user = await this.prisma.user.findUnique({
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

    async resetPassword(email:string, password: string) {
        const user = await this.prisma.user.update({
            where: { email },
            data: { password }
        })
        if (!user) throw new Error("User is not exist");
        return user
    }

    async signup(email:string, password: string) {
        let user = await this.prisma.user.findUnique({where: {email}});
        if (user) throw new Error("User already exist");
        user = await this.prisma.user.create({
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
}

export default UserService