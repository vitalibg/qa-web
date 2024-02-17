import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";
import ENV from "../utils/env";

class MainPage extends BasePage {
    private readonly page: Page;
    private readonly enterLink: Locator;

    constructor(page: Page) {
        super();
        page.locator = this.customLocator(page, Number(ENV.RESPONSE_SPEED));
        this.page = page;
        this.enterLink = this.page.getByText("Вход");
    }

    async navigate(): Promise<void> {
        await this.page.goto("/");
    }

    async clickEnterMenuItem(): Promise<void> {
        await this.clickElement(this.enterLink);
    }
}

export default MainPage;
