import { Question, User, Response } from "@prisma/client"

export type PrismaMock = {
    user: {
        findUnique: jest.Mock;
    };
    question: {
        findFirst: jest.Mock,
        findUnique: jest.Mock,
        update: jest.Mock,
        create: jest.Mock,
    };
    response: {
        create: jest.Mock;
    };
};

const mPrismaClient: PrismaMock = {
    user: {
        findUnique: jest.fn(),
    },
    question: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
    },
    response: {
        create: jest.fn(),
    }
};

const startedProjectDate = new Date("09/07/24")

const mockUser: User = {
    uid: "unique_user_id",
    email: "email@example.com",
    password: "password"
}

const mockQuestion: Question = {
    uid: "unique_question_id",
    user_uid: mockUser.uid,
    words: ["word1", "word2", "word3"],
    date: startedProjectDate,
    is_visible: true,
    is_answer: false
}

const mockResponse: Response = {
    uid: "unique_response_id",
    user_uid: mockUser.uid,
    question_uid: mockQuestion.uid,
    words: mockQuestion.words,
    hit_rate: 100
}

export default {
    prismaClient: mPrismaClient,
    user :mockUser,
    question :mockQuestion,
    response :mockResponse
}