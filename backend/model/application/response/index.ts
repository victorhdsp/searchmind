import { PrismaClient } from "@prisma/client";
import ErrorMessage from "../../../libs/ErrorMessage";

class ResponseService {
    private prisma: PrismaClient;
    
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async sendResponse(email: string, question_uid: string, words: string[], hit_rate: number) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error(ErrorMessage.userNotExist);
        const question = await this.prisma.question.update({
            where:{ uid: question_uid },
            data: { is_visible: false }
        });
        if (!question) throw new Error(ErrorMessage.thisQuestionNotExist);
        const response = await this.prisma.response.create({
            data: {
                user_uid: user.uid,
                question_uid: question.uid,
                words,
                hit_rate
            }
        })
        return response;
    }
    
    async history(email: string) {
        const user = await this.prisma.user.findUnique({
            where:{email},
            include: {
                responses: true
            }
        });
        if (!user) throw new Error(ErrorMessage.userNotExist);
        return user.responses;
    }
}
export default ResponseService;