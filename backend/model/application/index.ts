import { PrismaClient } from "@prisma/client";
import QuestionService from "./question";
import ResponseService from "./response";

class ApplicationService {
    private prisma: PrismaClient;
    private questionService: QuestionService;
    private responseService: ResponseService;

    constructor() {
        this.prisma = new PrismaClient();
        this.questionService = new QuestionService(this.prisma);
        this.responseService = new ResponseService(this.prisma);
    }

    async createQuestion(email: string, words: string[]) {
        return this.questionService.createQuestion(email, words);
    }
    async thisQuestionIsInvisible(email: string, uid: string) {
        return this.questionService.thisQuestionIsInvisible(email, uid);
    }
    async thisQuestionIsAnswer(email: string, uid: string, is_answer?:boolean) {
        return this.questionService.thisQuestionIsAnswer(email, uid, is_answer);
    }
    async getQuestion(email: string, uid?: string) {
        return this.questionService.getQuestion(email, uid);
    }
    
    async sendResponse(email: string, question_uid: string, words: string[], hit_rate: number) {
        return this.responseService.sendResponse(email, question_uid, words, hit_rate);
    }
    async history(email: string) {
        return this.responseService.history(email);
    }
}
export default ApplicationService;