import { Test, TestingModule } from "@nestjs/testing";

import { AppService } from "@/app/app.service";
import { AppController } from "@/app/app.controller";


describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

     beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = module.get<AppController>(AppController);
        appService = module.get<AppService>(AppService);
    });

    describe('getHello', () => {
        it('should return "Hello World!"', () => {
            const mockMessage = 'Hello World!';
            jest.spyOn(appService, 'getHello').mockReturnValue(mockMessage);

            expect(appController.getHello()).toBe(mockMessage);
        });
    });
});
