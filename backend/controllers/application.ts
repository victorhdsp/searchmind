import ApplicationService from "../model/application"

class applicationConstroller {
    private model: ApplicationService;

    constructor() {
        this.model = new ApplicationService();
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
        if (!uid && question.is_visible == false) {
            throw new Error("No has question for you")
        }
        return question;
    }
    
    async response(email: string, question_uid: string, words: string[]) {
        const hit_rate = await this.compareHitRate(email, question_uid, words);
        const response = await this.model.response(email, question_uid, words, hit_rate);
        return response;
    }
    
    async history(email: string) {
        const history = await this.model.history(email);
        return history;
    }
}


export default applicationConstroller;