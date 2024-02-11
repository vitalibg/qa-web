import {expect, test} from "@playwright/test";
import HomePage from "../pages/home-page";
import {LoginService} from "../services/login-service";
import ENV from "../utils/env"

test.describe('Корзина', () => {
    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, ENV.USER_LOGIN, ENV.USER_PASSWORD);
    })

    test("Переход в пустую корзину", async ({page}) => {
        expect(await new HomePage(page).getUserName()).toEqual(ENV.USER_LOGIN);
    });
})

