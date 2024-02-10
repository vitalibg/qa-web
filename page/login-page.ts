import {Locator, Page} from '@playwright/test';

class LoginPage {
    private loginInputField: Locator;
    private passwordInputField: Locator;
    private enterButton: Locator;

    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginInputField = page.locator('#loginform-username');
        this.passwordInputField = page.locator('#loginform-password');
        this.enterButton = page.locator("//button[@name='login-button']");
    }

    async loginAs(login: string, password: string) {
        await this.loginInputField.fill(login);
        await this.passwordInputField.fill(password);
        await this.enterButton.dispatchEvent("click");
    }
}

export default LoginPage;
