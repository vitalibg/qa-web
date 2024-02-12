import {Locator} from "@playwright/test";
import {Page} from "playwright-core";
import CartDropDownMenu from "./cart-drop-down-menu";

class HomePage {
    private readonly bookCount: Locator;
    private readonly cartLink: Locator;
    private readonly bookWithDiscount: Locator;
    private readonly bookWithoutDiscount: Locator;
    private readonly bookTitle: Locator;
    private readonly bookPrice: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.bookCount = page.locator(".basket-count-items.badge");
        this.cartLink = page.locator("#dropdownBasket");
        this.bookWithDiscount = page.locator(".hasDiscount .actionBuyProduct");
        this.bookWithoutDiscount = page.locator(".note-item:not(.hasDiscount)");
        this.bookTitle = page.locator(".hasDiscount .product_name");
        this.bookPrice = page.locator(".hasDiscount .product_price");
    }

    async getBookCount() {
        await this.bookCount.waitFor({state: "visible"})
        return await this.bookCount.textContent();
    }

    async clickCartMenuItem() {
        await this.cartLink.click();
    }

    async clearCart(page: Page) {
        await this.cartLink.click();
        await new CartDropDownMenu(page).clearCart();
    }

    async addBookWithDiscount() {
        await this.bookWithDiscount.first().waitFor({state: "visible"});
        await this.bookWithDiscount.first().click();
    }

    async addBookWithoutDiscount() {
        await this.bookWithoutDiscount.first().waitFor({state: "visible"});
        await this.bookWithoutDiscount.first().click();
    }

    async getFirstBookTitle() {
        return (await this.bookTitle.first().textContent()).trim()
    }

    async getFirstBookPrice() {
        return (await this.bookPrice.first().textContent()).trim()
    }
}

export default HomePage
