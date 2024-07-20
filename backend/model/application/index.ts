import { PrismaClient } from "@prisma/client";
import QuestionService from "./question";

class ApplicationService {
    private prisma: PrismaClient;
    private questionService: QuestionService;

    constructor() {
        this.prisma = new PrismaClient()
        this.questionService = new QuestionService(this.prisma)
    }

    async createQuestion(email: string, words: string[]) {
        return this.questionService.createQuestion(email, words);
    }
    
    async thisQuestionIsInvisible(email: string, uid: string) {
        return this.questionService.thisQuestionIsInvisible(email, uid);
    }
    
    async thisQuestionIsAnswer(email: string, uid: string) {
        return this.questionService.thisQuestionIsAnswer(email, uid);
    }
    
    async getQuestion(email: string, uid?: string) {
        return this.questionService.getQuestion(email, uid);
    }
    
    async response(email: string, question_uid: string, words: string[], hit_rate: number) {
        const user = await this.prisma.user.findUnique({where:{email}});
        if (!user) throw new Error("User is not exist");
        const question = await this.prisma.question.update({
            where:{ uid: question_uid },
            data: { is_visible: false }
        });
        if (!question) throw new Error("Question not exist");
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
        if (!user) throw new Error("User is not exist");
        return user.responses;
    }
}
export default ApplicationService;