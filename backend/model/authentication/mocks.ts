import { User } from "@prisma/client"

export type PrismaMock = {
    user: {
        findUnique: jest.Mock;
        update: jest.Mock;
        create: jest.Mock;
    };
};

const mPrismaClient: PrismaMock = {
    user: {
        findUnique: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
    }
};

const mockUser: User = {
    uid: "unique_user_id",
    email: "email@example.com",
    password: "password"
}

export default {
    prismaClient: mPrismaClient,
    user: mockUser,
}