import ResponseService from './index';
import mocks, { PrismaMock } from '../mocks';
import { describe, expect, test } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

jest.mock("@prisma/client", () => (
    {PrismaClient: jest.fn(() => mocks.prismaClient)}
));

describe('ResponseService', () => {
    let responseService: ResponseService;
    let prismaMock: PrismaMock;

    beforeEach(() => {
        prismaMock = new PrismaClient() as unknown as PrismaMock;
        responseService = new ResponseService(prismaMock as any as PrismaClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const email = "email@email.com"
    const question_id = "unique_question_id"
    const words = ["word1", "word2", "word3"]
    const hit_rate = 100
    const expected = {
        question_uid: question_id,
        user_uid: "unique_user_id",
        uid: "unique_response_id",
        words,
        hit_rate
    }

    describe("Create response", () => {
        test("should return to response data", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.update.mockResolvedValue(mocks.question);
            prismaMock.response.create.mockResolvedValue(mocks.response)

            const result = await responseService.sendResponse(
                email, question_id, words, hit_rate
            );
            expect(expected).toEqual(result);
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where:{ email }
            });
            expect(prismaMock.question.update).toHaveBeenCalledWith({
                where:{ uid: question_id },
                data: { is_visible: false }
            });
            expect(prismaMock.response.create).toHaveBeenCalledWith({
                data: {
                    user_uid: "unique_user_id",
                    question_uid: "unique_question_id",
                    words,
                    hit_rate
                }
            });
        })

        test("should throw error question not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);
            prismaMock.question.update.mockResolvedValue(null);

            const result = responseService.sendResponse(
                email, question_id, words, hit_rate
            );

            await expect(result).rejects.toThrow("Question not exist");
            expect(prismaMock.question.update).toHaveBeenCalledWith({
                where:{ uid: question_id },
                data: { is_visible: false }
            });
        })

        test("should throw error User is not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const result = responseService.sendResponse(
                email, question_id, words, hit_rate
            );

            await expect(result).rejects.toThrow("User is not exist");
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where:{ email }
            });
        })
    })

    describe("Get history", () => {
        test("should return to response data", async () => {
            prismaMock.user.findUnique.mockResolvedValue(mocks.user);

            await responseService.history(email)
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where:{ email },
                include: {
                    responses: true
                }
            });
        })

        test("should throw error User is not exist", async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const result = responseService.history(email);

            await expect(result).rejects.toThrow("User is not exist");
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where:{ email },
                include: {
                    responses: true
                }
            });
        })
    })
});