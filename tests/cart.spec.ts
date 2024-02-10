import {test} from "@playwright/test";
import {LoginService} from "../services/login-service";


test.describe("Корзина", () => {
    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, "test", "test")
    });

    // test("Переход в пустую корзину", async ({page}) => {
    // });
});
