import {Page} from "playwright-core";
import CartDropDownMenu from "./cart-drop-down-menu";
import {Locator} from "@playwright/test";
import BasePage from "./base-page";

class HomePage extends BasePage {
    private readonly page: Page;
    private readonly bookCount: Locator;
    private readonly cartLink: Locator;
    private readonly bookWithDiscount: Locator;
    private readonly bookWithoutDiscount: Locator;
    private readonly bookTitleWithoutDiscount: Locator;
    private readonly bookPriceWithoutDiscount: Locator;
    private readonly bookTitleWithDiscount: Locator;
    private readonly bookPriceWithDiscount: Locator;
    private readonly bookPrice: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.bookCount = page.locator(".basket-count-items.badge");
        this.cartLink = page.locator("#dropdownBasket");
        this.bookWithDiscount = page.locator(".hasDiscount .actionBuyProduct");
        this.bookWithoutDiscount = page.locator(".note-item:not(.hasDiscount) .actionBuyProduct");
        this.bookTitleWithoutDiscount = page.locator(".note-item:not(.hasDiscount) .product_name")
        this.bookPriceWithoutDiscount = page.locator(".note-item:not(.hasDiscount) .product_price")
        this.bookTitleWithDiscount = page.locator(".hasDiscount .product_name")
        this.bookPriceWithDiscount = page.locator(".hasDiscount .product_price")
        this.bookPrice = page.locator(".hasDiscount .product_price");
    }

    async getBookCount(): Promise<string> {
        return await this.getText(this.bookCount);
    }

    async clickCartMenu(): Promise<void> {
        await this.clickElement(this.cartLink);
    }

    async addBookWithDiscount(): Promise<void> {
        await this.clickElement(this.bookWithDiscount.first());
    }

    async addBookWithoutDiscount(): Promise<void> {
        await this.clickElement(this.bookWithoutDiscount.first());
    }

    async getFirstBookTitleWithoutDiscount(): Promise<string> {
        return await this.getText(this.bookTitleWithoutDiscount.first());
    }

    async getFirstBookPriceWithoutDiscount(): Promise<string> {
        return await this.getText(this.bookPriceWithoutDiscount.first());
    }

    async getFirstBookTitleWithDiscount(): Promise<string> {
        return await this.getText(this.bookTitleWithDiscount.first());
    }

    async getFirstBookPriceWithDiscount(): Promise<string> {
        return await this.getText(this.bookPriceWithDiscount.first());
    }

    async getFirstBookPrice(): Promise<string> {
        return await this.getText(this.bookPrice.first());
    }

    async clearCart(): Promise<void> {
        if (await this.getBookCount() === "9") {
            await this.addBookWithoutDiscount();
            await this.addBookWithDiscount();
            await this.clickCartMenu();
            await new CartDropDownMenu(this.page).clearCart();
        }

        if (await this.getBookCount() !== "0") {
            await this.clickCartMenu();
            await new CartDropDownMenu(this.page).clearCart();
        }
    }
}

export default HomePage
