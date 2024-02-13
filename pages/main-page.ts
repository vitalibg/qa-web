import {Locator, Page} from "@playwright/test";
import BasePage from "./base-page";

class MainPage extends BasePage {
    private readonly page: Page;
    private readonly enterLink: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.enterLink = page.getByText("Вход");
    }

    async navigate(): Promise<void> {
        await this.page.goto("/");
    }

    async clickEnterMenuItem(): Promise<void> {
        await this.clickElement(this.enterLink);
    }
}

export default MainPage;
