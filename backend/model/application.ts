import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createQuestion(email: string, words: string[]) {
    const user = await prisma.user.findUnique({where:{email}});
    if (!user) throw new Error("User is not exist");
    const question = await prisma.question.create({
        data: {
            user_uid: user.uid,
            words,
        }
    })
    return {question}
}

async function changeVisibilityOnQuestion(email: string, uid: string) {
    const user = await prisma.user.findUnique({where:{email}});
    if (!user) throw new Error("User is not exist");
    const question = await prisma.question.update({
        where:{uid},
        data: {is_visible: true}
    });
    if (!question) throw new Error("This question not exist");
    return {question}
}

async function getQuestion(email: string, uid?: string) {
    const user = await prisma.user.findUnique({where:{email}});
    if (!user) throw new Error("User is not exist");
    let question = null
    if (uid) {
        question = await prisma.question.findUnique({
            where:{
                user_uid: user.uid,
                uid
            }
        });
    } else {
        question = await prisma.question.findFirst({
            where: { user_uid: user.uid },
            orderBy: { date: "asc" }});
    }
    if (!question) throw new Error("This question not exist");
    return {question}
}

async function response(email: string, question_uid: string, words: string[], hit_rate: number) {
    const user = await prisma.user.findUnique({where:{email}});
    if (!user) throw new Error("User is not exist");
    const question = await prisma.question.update({
        where:{ uid: question_uid },
        data: { is_visible: false }
    });
    if (!question) throw new Error("This question not exist");
    const response = await prisma.response.create({
        data: {
            user_uid: user.uid,
            question_uid: question.uid,
            words,
            hit_rate
        }
    })
    return {response};
}

async function history(email: string) {
    const user = await prisma.user.findUnique({
        where:{email},
        include: {
            responses: true
        }
    });
    if (!user) throw new Error("User is not exist");
    return { history: user.responses };
}

export default {
    createQuestion,
    changeVisibilityOnQuestion,
    getQuestion,
    response,
    history
}