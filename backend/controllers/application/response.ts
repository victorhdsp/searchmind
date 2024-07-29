import ErrorMessage from "../../libs/ErrorMessage";
import ApplicationService from "../../model/application"

class ResponseController {
    private model: ApplicationService;

    constructor(model: ApplicationService) {
        this.model = model;
    }

    async compareHitRate(
        email:string, question_uid:string, response_words: string[]
    ): Promise<number> {
        const question = await this.model.getQuestion(email, question_uid);
        let hits = 0;
        question.words.forEach((word, index) => {
            if (response_words[index] === word)
                hits++;
        })
        return hits / question.words.length * 100;
    }

    async sendResponse(email: string, question_uid: string, words: string[]) {
        const hit_rate = await this.compareHitRate(email, question_uid, words);
        const response = await this.model.sendResponse(email, question_uid, words, hit_rate);
        await this.model.thisQuestionIsAnswer(email, question_uid, false);
        return response;
    }
    
    async history(email: string) {
        const history = await this.model.history(email);
        return history;
    }
}

export default ResponseController;