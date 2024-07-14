import model from "../model/application"

function compareHitRate(
    email:string, question_uid:string, response_words: string[]
): number {
    const question = model.getQuestion(email, question_uid);
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

function changeVisibilityOnQuestion(email: string, uid: string) {
    const question = model.changeVisibilityOnQuestion(email, uid);
    return question;
}

function getQuestion(email: string, uid?: string) {
    const question = model.getQuestion(email, uid);
    if (!uid && question.is_visible == false) {
        throw new Error("Unnamed question is invisible")
    }
    return question;
}

function response(email: string, question_uid: string, words: string[]) {
    const hit_rate = compareHitRate(email, question_uid, words);
    const response = model.response(email, question_uid, words, hit_rate);
    return response;
}

function history(email: string) {
    const responses = model.history(email);
    return responses;
}

export default {
    createQuestion,
    changeVisibilityOnQuestion,
    getQuestion,
    response,
    history
}