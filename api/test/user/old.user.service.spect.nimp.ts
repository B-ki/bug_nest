import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/prisma';

import { UserService } from '../../src/modules/user/user.service';

class PrismaClientMock extends PrismaClient {}

const prismaServiceMock = mockDeep<PrismaService>({
  user: new PrismaClientMock().user,
});

describe('UserService', () => {
  let user: UserService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: PrismaService, useValue: prismaServiceMock }],
    }).compile();

    user = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(user).toBeDefined();
  });

  it('should have functions : login, fetchProfileInformation and generateJWT', () => {
    expect(user.getAll).toBeDefined();
    expect(user.getUnique).toBeDefined();
    expect(user.createUser).toBeDefined();
  });

  /*it('createUser => Should create a new user', async () => {
    //arrange
    const profile: FortyTwoProfile = {
      login: 'testLogin',
      email: 'testMail',
      imageUrl: 'testUrl',
      displayName: 'testLogin',
      firstName: 'testFirstName',
      lastName: 'testLastName',
    };

    const user = {
      id: '1',
      login: 'testLogin',
      email: 'testMail',
      imageUrl: 'testUrl',
      displayName: 'testLogin',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      createdAt: new Date(),
    };

    //act
    const testUsers:
      | {
          id: string;
          login: string;
          email: string;
          imageUrl: string | null;
          displayName: string;
          firstName: string;
          lastName: string;
          createdAt: Date;
        }[]
      | Prisma.PrismaPromise<
          {
            id: string;
            login: string;
            email: string;
            imageUrl: string | null;
            displayName: string;
            firstName: string;
            lastName: string;
            createdAt: Date;
          }[]
        > = [];

    prisma.user.findMany.mockResolvedValueOnce(testUsers);

    //prismaService.user.create.mockResolvedValue(user);

    // await expect(userService.createUser(profile)).resolves.toEqual(user);

    expect(user.getAll()).resolves.toBe(testUsers);
  });*/

  const fakeUser = {
    id: '1',
    login: 'testLogin',
    email: 'testMail',
    imageUrl: 'testUrl',
    displayName: 'testLogin',
    firstName: 'testFirstName',
    lastName: 'testLastName',
    createdAt: new Date(),
  };

  it('should retrieve a user from the fake database', async () => {
    const retrievedUser = await user.getUnique('testLogin'); // Use your service to retrieve the user
    expect(retrievedUser).toEqual(fakeUser); // Assert that it matches the fake user
  });
});
