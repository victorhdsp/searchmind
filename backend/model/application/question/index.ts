import { PrismaClient } from "@prisma/client";

class QuestionService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createQuestion(email: string, words: string[]) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error("User is not exist");
        const question = await this.prisma.question.create({
            data: {
                user_uid: user.uid,
                words,
            }
        })
        return question
    }
    
    async thisQuestionIsInvisible(email: string, uid: string) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error("User is not exist");
        const question = await this.prisma.question.update({
            where:{uid},
            data: {is_visible: false}
        });
        if (!question) throw new Error("This question not exist");
        return question
    }
    
    async thisQuestionIsAnswer(email: string, uid: string) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error("User is not exist");
        const question = await this.prisma.question.update({
            where:{uid},
            data: {is_answer: true}
        });
        if (!question) throw new Error("This question not exist");
        return question
    }
    
    async getQuestion(email: string, uid?: string) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error("User is not exist");
        let question = null
        if (uid) {
            question = await this.prisma.question.findUnique({
                where:{
                    user_uid: user.uid,
                    uid
                }
            });
        } else {
            question = await this.prisma.question.findFirst({
                where: { user_uid: user.uid },
                orderBy: { date: "asc" }});
        }
        if (!question) throw new Error("This question not exist");
        return question
    }
}
export default QuestionService;