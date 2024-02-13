import {Locator, Page} from "@playwright/test";

class LoginPage {
    private readonly page: Page;
    private readonly loginInputField: Locator;
    private readonly passwordInputField: Locator;
    private readonly enterButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInputField = page.locator("#loginform-username");
        this.passwordInputField = page.locator("#loginform-password");
        this.enterButton = page.locator("[name='login-button']");
    }

    async loginAs(login: string, password: string) {
        await this.loginInputField.clear();
        await this.loginInputField.type(login)
        await this.passwordInputField.clear()
        await this.passwordInputField.type(password);
        await this.enterButton.elementHandle({timeout: 5000}).then(button => {
            button.waitForElementState("enabled")
        })
        await this.enterButton.click();
    }
}

export default LoginPage;
