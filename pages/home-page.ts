import {Locator} from "@playwright/test";
import {Page} from "playwright-core";

class HomePage {
    private readonly userName: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator(".text-uppercase")
    }

    async getUserName() {
        return await this.userName.textContent()
    }
}

export default HomePage
