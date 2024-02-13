import {Locator, Page} from "@playwright/test";

class MainPage {
    private readonly page: Page;
    private readonly enterLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.enterLink = page.getByText("Вход");
    }

    async navigate() {
        await this.page.goto("/");
    }

    async clickEnterMenuItem() {
        await this.enterLink.waitFor({state: "visible"})
        await this.enterLink.click();
    }
}

export default MainPage;
