import {Locator} from "@playwright/test";
import {Page} from "playwright-core";
import CartPage from "./cart-page";

class HomePage {
    private readonly userName: Locator;
    private readonly bookCount: Locator;
    private readonly cartLink: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator(".text-uppercase");
        this.bookCount = page.locator(".basket-count-items.badge");
        this.cartLink = page.locator("#dropdownBasket");
    }

    async getUserName() {
        return await this.userName.textContent()
    }

    async getBookCount() {
        return await this.bookCount.textContent()
    }

    async clearCart() {
        await this.cartLink.click()
        await new CartPage(this.page).clearCart()
    }
}

export default HomePage
