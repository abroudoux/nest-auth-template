import { Test, TestingModule } from "@nestjs/testing";

import { UsersController } from "@/users/users.controller";
import { UsersService } from "@/users/users.service";

describe("UsersController", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe("getUser", () => {
    it("should return a user by userId", async () => {
      const mockUserId = "123";
      const mockUserEmail = "toto@toto.com";
      const mockUserFirstName = "Toto";
      const mockUser = {
        id: mockUserId,
        email: mockUserEmail,
        firstName: mockUserFirstName,
      };
      jest.spyOn(usersService, "getUser").mockResolvedValue(mockUser);
      const result = await usersController.getUser(mockUserId);
      expect(result).toBe(mockUser);
      expect(usersService.getUser).toHaveBeenCalledWith({ userId: mockUserId });
    });
  });
});
