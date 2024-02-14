import {Locator, Page} from "@playwright/test";
import BasePage from "./base-page";
import {WAITING_300_MS} from "../utils/helper";

class MainPage extends BasePage {
    private readonly page: Page;
    private readonly enterLink: Locator;

    constructor(page: Page) {
        super();
        page.locator = this.customLocator(page, WAITING_300_MS);
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
