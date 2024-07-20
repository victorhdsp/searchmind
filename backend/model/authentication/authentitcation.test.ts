import {describe, expect, test} from '@jest/globals';
import UserService from './index';
import { PrismaClient } from '@prisma/client';
import mocks, {PrismaMock} from './mocks';

jest.mock("@prisma/client", () => ({PrismaClient: jest.fn(() => mocks.prismaClient)}))

describe('UserService', () => {
  let userService: UserService;
  let prismaMock: PrismaMock;

  beforeEach(() => {
    userService = new UserService();
    prismaMock = new PrismaClient() as unknown as PrismaMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const email = "email@example.com";
  const password = "password";
  const expected = {
    uid: "unique_user_id",
    email: "email@example.com",
    password: "password"
  }
  test("login should return to user data", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      ...mocks.user, config: {}, questions: [], responses: []
    });

    const result = await userService.login(email);
    expect(result).toEqual({
      ...expected, 
      config: {}, 
      questions: [], 
      responses: []
    });
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email },
      include: {
        config: true,
        questions: true,
        responses: true
      }
    });
  })

  test("login should throw error if user not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    
    const result = userService.login(email);
    await expect(result).rejects.toThrow("Email or Password is wrong")
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email },
      include: {
        config: true,
        questions: true,
        responses: true
      }
    });
  })

  test("resetPassword should update password and return to user data", async () => {
    prismaMock.user.update.mockResolvedValue({...mocks.user, password: "newPassword"});
    
    const result = await userService.resetPassword(email, "newPassword");
    expect(result).toEqual({...expected, password: "newPassword"})
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { email: 'email@example.com' },
      data: { password: 'newPassword' }
    });
  })

  test("resetPassword should throw error if user not found", async () => {
    prismaMock.user.update.mockResolvedValue(null);

    const result = userService.resetPassword(email, "newPassword");

    await expect(result).rejects.toThrow("User is not exist")
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { email: 'email@example.com' },
      data: { password: 'newPassword' }
    });
  })

  test("create user should return to user data", async () => {
    prismaMock.user.create.mockResolvedValue(mocks.user);
    
    const result = await userService.signup(email, password);
    expect(result).toEqual(expected);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: { 
        email,
        password,
        config: {
            create: {
                question_hours: ["13:00"]
            }
        }
      },
      include: {
          config: true,
          questions: true,
          responses: true
      }
    });
  })

  test("create user should throw error if user already exist", async () => {
    const mockUser = { email: "email@email.com" };
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    
    const user = userService.signup("email@email.com", "password");
    await expect(user).rejects.toThrowError("User already exist");
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'email@email.com' },
    });
  })
});