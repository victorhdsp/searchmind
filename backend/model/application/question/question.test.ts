import { describe, expect, test } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import QuestionService from '.'; './index';
import mocks, { PrismaMock } from '../mocks';

jest.mock("@prisma/client", () => (
    {PrismaClient: jest.fn(() => mocks.prismaClient)}
));

describe('ApplicationService', () => {
    let questionService: QuestionService;
    let prismaMock: PrismaMock;

    beforeEach(() => {
        prismaMock = new PrismaClient() as unknown as PrismaMock;
        questionService = new QuestionService(prismaMock as any as PrismaClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const email = "email@email.com";
    const words = ["word1", "word2", "word3"];
    const question_id = "unique_question_id";
    const expected = {
        user_uid: "unique_user_id",
        uid: "unique_question_id",
        date: new Date("09/07/2024"),
        words: ["word1", "word2", "word3"],
        is_visible: true,
        is_answer: false
    }

    describe('Create question', () => {
        test("should return to question data", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.create.mockResolvedValue(mocks.question);

            const result = await questionService.createQuestion(email, words);
            expect(result).toEqual(expected);
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { email }
            });
            expect(prismaMock.question.create).toHaveBeenCalledWith({
                data: {
                    user_uid: expected.user_uid,
                    words: expected.words,
                }
            });
        })

        test("should throw error User is not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const result = questionService.createQuestion(email, words);

            await expect(result).rejects.toThrow("User is not exist");
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { email }
            });
        })
    })

    describe('Get question', () => {
        test("get by id should return question data", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.findUnique.mockResolvedValue(mocks.question)
    
            const result = await questionService.getQuestion(email, question_id);
            expect(result).toEqual(expected);
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { email }
            });
            expect(prismaMock.question.findUnique).toHaveBeenCalledWith({
                where: {
                    uid: "unique_question_id",
                    user_uid: "unique_user_id",
                }
            });
        })
    
        test("should return question data", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.findFirst.mockResolvedValue(mocks.question)
    
            await questionService.getQuestion(email);
            expect(prismaMock.question.findFirst).toHaveBeenCalledWith({
                where: {
                    user_uid: "unique_user_id",
                },
                orderBy: {
                    date: "asc"
                }
            });
        })

        test("should throw error question not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.findUnique.mockResolvedValue(null);
    
            const question = questionService.getQuestion(email, question_id);
            await expect(question).rejects.toThrow("This question not exist")
            expect(prismaMock.question.findUnique).toHaveBeenCalledWith({
                where: { 
                    uid: "unique_question_id",
                    user_uid: "unique_user_id"
                 }
            });
        })
    
        test("should throw error User is not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);
            const question = questionService.getQuestion(email, question_id);
            
            await expect(question).rejects.toThrow("User is not exist")
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { email }
            });
        })
    })

    describe('Change visibility', () => {
        test("should update and return question data", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.update.mockResolvedValue({...mocks.question, is_visible: false});

            const result = await questionService.thisQuestionIsInvisible(email, question_id);
            const expected = {
                user_uid: "unique_user_id",
                uid: "unique_question_id",
                date: new Date("09/07/2024"),
                words: ["word1", "word2", "word3"],
                is_visible: false,
                is_answer: false
            }
            expect(result).toEqual(expected);
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { email }
            });
            expect(prismaMock.question.update).toHaveBeenCalledWith({
                where: {
                    uid: "unique_question_id"
                },
                data: {
                    is_visible: false
                }
            });
        })

        test("should throw error question not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.update.mockResolvedValue(null);
    
            const question = questionService.thisQuestionIsInvisible(email, question_id);
            await expect(question).rejects.toThrow("This question not exist")
            expect(prismaMock.question.update).toHaveBeenCalledWith({
                where: { uid: "unique_question_id" },
                data: {
                    is_visible: false
                }
            });
        })

        test("should throw error User is not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const result = questionService.thisQuestionIsInvisible(email, question_id);

            await expect(result).rejects.toThrow("User is not exist");
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { email }
            });
        })
    })

    describe('Change answer', () => {
        test("should update and return question data", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.update.mockResolvedValue({
                ...mocks.question, is_visible: false, is_answer: true
            });

            const result = await questionService.thisQuestionIsAnswer(email, question_id);
            const expected = {
                user_uid: "unique_user_id",
                uid: "unique_question_id",
                date: new Date("09/07/2024"),
                words: ["word1", "word2", "word3"],
                is_visible: false,
                is_answer: true
            }
            expect(result).toEqual(expected);
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { email }
            });
            expect(prismaMock.question.update).toHaveBeenCalledWith({
                where: {
                    uid: "unique_question_id"
                },
                data: {
                    is_answer: true
                }
            });
        })

        test("should throw error question not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.update.mockResolvedValue(null);
    
            const question = questionService.thisQuestionIsAnswer(email, question_id);
            await expect(question).rejects.toThrow("This question not exist")
            expect(prismaMock.question.update).toHaveBeenCalledWith({
                where: { uid: "unique_question_id" },
                data: {
                    is_answer: true
                }
            });
        })

        test("should throw error User is not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const result = questionService.thisQuestionIsAnswer(email, question_id);

            await expect(result).rejects.toThrow("User is not exist");
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { email }
            });
        })
    })
});