import model from "../model/application"

async function compareHitRate(
    email:string, question_uid:string, response_words: string[]
): Promise<number> {
    const question = await model.getQuestion(email, question_uid);
    let hits = 0;
    question.words.forEach((word, index) => {
        if (response_words[index] === word)
            hits++;
    })
    return hits / question.words.length * 100;
}

async function getRandomWords(limit: number) {
    const words: string[] = []
    for (let position = 0; position < limit; position++) {
        const response = await fetch('https://api.dicionario-aberto.net/random');
        const { word } = await response.json();
        words.push(word)
    }
    return words
}

async function createQuestion(email: string) {
    const words = await getRandomWords(5)
    const question = model.createQuestion(email, words);
    return question;
}

async function readedQuestion(email: string, uid: string, minutes:number) {
    const question = await model.thisQuestionIsInvisible(email, uid);

    setTimeout(async () => {
        await model.thisQuestionIsAnswer(email, uid);
    }, 1000 * 60 * minutes)
    return question;
}

async function getQuestion(email: string, uid?: string) {
    const question = await model.getQuestion(email, uid);
    if (!uid && question.is_visible == false) {
        throw new Error("No has question for you")
    }
    return question;
}

async function response(email: string, question_uid: string, words: string[]) {
    const hit_rate = await compareHitRate(email, question_uid, words);
    const response = await model.response(email, question_uid, words, hit_rate);
    return response;
}

async function history(email: string) {
    const history = await model.history(email);
    return history;
}

export default {
    createQuestion,
    readedQuestion,
    getQuestion,
    response,
    history
}