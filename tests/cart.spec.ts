import {expect, test} from "@playwright/test";
import HomePage from "../pages/home-page";
import {LoginService} from "../services/login-service";
import ENV from "../utils/env"
import {CartService} from "../services/cart-service";

test.describe('Корзина', () => {
    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, ENV.USER_LOGIN, ENV.USER_PASSWORD);
        await CartService.clearCart(page);
    })

    test("Переход в пустую корзину", async ({page}) => {
        expect(await new HomePage(page).getUserName()).toEqual(ENV.USER_LOGIN);
    });
})

