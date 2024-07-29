import { PrismaClient } from "@prisma/client";
import ErrorMessage from "../../../libs/ErrorMessage";

class QuestionService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createQuestion(email: string, words: string[]) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error(ErrorMessage.userNotExist);
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
        if (!user) throw new Error(ErrorMessage.userNotExist);
        const question = await this.prisma.question.update({
            where:{uid},
            data: {is_visible: false}
        });
        if (!question) throw new Error(ErrorMessage.thisQuestionNotExist);
        return question
    }
    
    async thisQuestionIsAnswer(email: string, uid: string, is_answer?: boolean) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error(ErrorMessage.userNotExist);
        const question = await this.prisma.question.update({
            where:{uid},
            data: {is_answer: is_answer || true}
        });
        if (!question) throw new Error(ErrorMessage.thisQuestionNotExist);
        return question
    }
    
    async getQuestion(email: string, uid?: string) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error(ErrorMessage.userNotExist);
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
        if (!question) throw new Error(ErrorMessage.thisQuestionNotExist);
        return question
    }
}
export default QuestionService;