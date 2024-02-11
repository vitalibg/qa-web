import {Locator} from "@playwright/test";
import {Page} from "playwright-core";
import CartDropDownMenu from "./cart-drop-down-menu";

class HomePage {
    private readonly userName: Locator;
    private readonly bookCount: Locator;
    private readonly cartLink: Locator;
    private readonly bookWithDiscount: Locator;
    private readonly bookWithoutDiscount: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator(".text-uppercase");
        this.bookCount = page.locator(".basket-count-items.badge");
        this.cartLink = page.locator("#dropdownBasket");
        this.bookWithDiscount = page.locator(".hasDiscount .actionBuyProduct");
        this.bookWithoutDiscount = page.locator(".note-item:not(.hasDiscount)");
    }

    async getUserName() {
        return await this.userName.textContent();
    }

    async getBookCount() {
        return await this.bookCount.textContent();
    }

    async clearCart() {
        await this.cartLink.click();
        await new CartDropDownMenu(this.page).clearCart();
    }

    async openCart() {
        await this.cartLink.click();
        await new CartDropDownMenu(this.page).goToCart();
    }

    async clickCartMenuItem() {
        await this.cartLink.click();
    }

    async addFirstBookWithDiscount() {
        await this.bookWithDiscount.first().click();
    }

    async addFirstBookWithoutDiscount() {
        await this.bookWithoutDiscount.first().click();
    }

    async getFirstBookTitle() {
        return (await this.page.locator(".hasDiscount .product_name").first().textContent()).trim()
    }

    async getFirstBookPrice() {
        return (await this.page.locator(".hasDiscount .product_price").first().textContent()).trim()
    }
}

export default HomePage
