import {expect, Locator, Page} from "@playwright/test";

class LoginPage {
    private readonly loginInputField: Locator;
    private readonly passwordInputField: Locator;
    private readonly enterButton: Locator;

    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginInputField = page.locator("#loginform-username");
        this.passwordInputField = page.locator("#loginform-password");
        this.enterButton = page.locator("[name='login-button']");
    }

    async loginAs(login: string, password: string) {
        await this.loginInputField.type(login);
        await this.passwordInputField.type(password);
        await expect(this.enterButton).not.toHaveAttribute('disabled');
        await this.enterButton.click()
    }
}

export default LoginPage;
