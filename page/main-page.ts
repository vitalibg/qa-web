import { Locator, Page } from "@playwright/test";

class MainPage {
    private enterButton: Locator;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.enterButton = page.getByText("Вход");
    }

    async navigate() {
        await this.page.goto("/");
    }

    async clickEnterMenuItem() {
        await this.enterButton.click();
    }
}

export default MainPage;
