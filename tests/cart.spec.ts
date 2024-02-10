import {test} from "@playwright/test";
import {LoginService} from "../services/login-service";


test.describe("Cart", () => {
    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, "test", "test")
    });

    test("", async ({page}) => {
    });
});
