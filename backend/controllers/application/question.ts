import ErrorMessage from "../../libs/ErrorMessage";
import ApplicationService from "../../model/application"

class QuestionController {
    private model: ApplicationService;

    constructor(model: ApplicationService) {
        this.model = model;
    }
    
    async getRandomWords(limit: number) {
        const words: string[] = []
        for (let position = 0; position < limit; position++) {
            const response = await fetch('https://api.dicionario-aberto.net/random');
            const { word } = await response.json();
            words.push(word)
        }
        return words
    }
    
    async createQuestion(email: string) {
        const words = await this.getRandomWords(5)
        const question = this.model.createQuestion(email, words);
        return question;
    }
    
    async readedQuestion(email: string, uid: string, minutes:number) {
        const question = await this.model.thisQuestionIsInvisible(email, uid);
    
        setTimeout(async () => {
            await this.model.thisQuestionIsAnswer(email, uid);
        }, 1000 * 60 * minutes)
        return question;
    }
    
    async getQuestion(email: string, uid?: string) {
        const question = await this.model.getQuestion(email, uid);
        if (question.is_visible == false && question.is_answer == false)
            throw new Error(ErrorMessage.noHasWordsForMemorize);
        return question;
    }
}

export default QuestionController;