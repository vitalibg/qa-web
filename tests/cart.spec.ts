import {expect, test} from "@playwright/test";
import HomePage from "../pages/home-page";
import {LoginService} from "../services/login-service";


test.describe('Корзина', () => {
    const USER_LOGIN: string = "test";
    const USER_PASSWORD: string = "test";

    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, USER_LOGIN, USER_PASSWORD);
    })

    test("Переход в пустую корзину", async ({page}) => {
        expect(await new HomePage(page).getUserName()).toEqual(USER_LOGIN);
    });
})

