import {Locator, Page} from "@playwright/test";
import BasePage from "./base-page";
import ENV from "../utils/env";

class LoginPage extends BasePage {
    private readonly page: Page;
    private readonly loginInputField: Locator;
    private readonly passwordInputField: Locator;
    private readonly enterButton: Locator;

    constructor(page: Page) {
        super();
        page.locator = this.customLocator(page, Number(ENV.RESPONSE_SPEED));
        this.page = page;
        this.loginInputField = this.page.locator("#loginform-username");
        this.passwordInputField = this.page.locator("#loginform-password");
        this.enterButton = this.page.locator("[name='login-button']");
    }

    async loginAs(login: string, password: string): Promise<void> {
        await this.typeValue(this.loginInputField, login);
        await this.typeValue(this.passwordInputField, password);
        await this.clickElement(this.enterButton)
    }
}

export default LoginPage;
