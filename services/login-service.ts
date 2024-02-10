import {Page} from "playwright-core";
import MainPage from "../pages/main-page";
import LoginPage from "../pages/login-page";

export abstract class LoginService {
    public static async loginAs(page: Page, login: string, password: string) {
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await mainPage.navigate();
        await mainPage.clickEnterMenuItem();
        await loginPage.loginAs(login, password);
    }
}
