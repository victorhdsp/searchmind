import ErrorMessage from "../../libs/ErrorMessage";
import ApplicationService from "../../model/application"
import QuestionController from "./question";
import ResponseController from "./response";

class ApplicationController {
    private model: ApplicationService;
    private questionController: QuestionController;
    private responseController: ResponseController;

    constructor() {
        this.model = new ApplicationService();
        this.questionController = new QuestionController(this.model);
        this.responseController = new ResponseController(this.model);
    }
    
    async createQuestion(email: string) {
        return this.questionController.createQuestion(email);
    }
    
    async readedQuestion(email: string, uid: string, minutes:number) {
        return this.questionController.readedQuestion(email, uid, minutes);
    }
    
    async getQuestion(email: string, uid?: string) {
        return this.questionController.getQuestion(email, uid);
    }
    
    async sendResponse(email: string, question_uid: string, words: string[]) {
        return this.responseController.sendResponse(email, question_uid, words);
    }
    
    async history(email: string) {
        return this.responseController.history(email);
    }
}


export default ApplicationController;