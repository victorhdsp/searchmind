import db from "../database/db";
import crypto from "crypto"

function createQuestion(email: string, words: string[]) {
    const user = db.find((user) => user.email === email);
    if (!user) throw new Error("User is net exist");
    const question = {
        uid: crypto.randomUUID(),
        date: new Date().toDateString(),
        words,
        is_visible: false
    }
    user.questions.push(question)
    return question
}

function changeVisibilityOnQuestion(email: string, uid: string) {
    const user = db.find((user) => user.email === email);
    if (!user) throw new Error("User is net exist");
    const question = user.questions.find((question) => question.uid === uid);
    if (!question) throw new Error("This question not exist");
    question.is_visible = true;
    return question
}

function getQuestion(email: string, uid?: string) {
    const user = db.find((user) => user.email === email);
    if (!user) throw new Error("User is net exist");
    let question = null
    if (uid) {
        question = user.questions.find((question) => question.uid === uid);
    } else {
        question = user.questions[user.questions.length - 1]
    }
    if (!question) throw new Error("This question not exist");
    return question
}

function response(email: string, question_uid: string, words: string[], hit_rate: number) {
    const user = db.find((user) => user.email === email);
    if (!user) throw new Error("User is net exist");
    const question = user.questions.find((question) => question.uid === question_uid);
    if (!question) throw new Error("This question not exist");
    const response = {
        uid: crypto.randomUUID(),
        question_uid,
        words,
        hit_rate
    };
    user.responses.push(response);
    return response;
}

function history(email: string) {
    const user = db.find((user) => user.email === email);
    if (!user) throw new Error("User is net exist");
    return user.responses;
}

export default {
    createQuestion,
    changeVisibilityOnQuestion,
    getQuestion,
    response,
    history
}