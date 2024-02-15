import {Page} from "playwright-core";
import CartMenu from "./cart-menu";
import {Locator} from "@playwright/test";
import BasePage from "./base-page";
import ENV from "../utils/env";

class HomePage extends BasePage {
    private readonly page: Page;
    private readonly bookCount: Locator;
    private readonly cartLink: Locator;
    private readonly book: Locator;
    private readonly booksWithDiscount: Locator;
    private readonly booksWithoutDiscount: Locator;
    private readonly bookTitleWithoutDiscount: Locator;
    private readonly bookPriceWithoutDiscount: Locator;
    private readonly bookTitleWithDiscount: Locator;
    private readonly bookPriceWithDiscount: Locator;
    private readonly bookPrice: Locator;

    constructor(page: Page) {
        super();
        page.locator = this.customLocator(page, Number(ENV.RESPONSE_SPEED));
        this.page = page;
        this.bookCount = this.page.locator(".basket-count-items.badge");
        this.cartLink = this.page.locator("#dropdownBasket");
        this.book = this.page.locator(".actionBuyProduct.btn")
        this.booksWithDiscount = this.page.locator(".hasDiscount .actionBuyProduct");
        this.booksWithoutDiscount = this.page.locator(".note-item:not(.hasDiscount) .actionBuyProduct");
        this.bookTitleWithoutDiscount = this.page.locator(".note-item:not(.hasDiscount) .product_name")
        this.bookPriceWithoutDiscount = this.page.locator(".note-item:not(.hasDiscount) .product_price")
        this.bookTitleWithDiscount = this.page.locator(".hasDiscount .product_name")
        this.bookPriceWithDiscount = this.page.locator(".hasDiscount .product_price")
        this.bookPrice = this.page.locator(".hasDiscount .product_price");
    }

    async getBookCount(): Promise<string> {
        return await this.getText(this.bookCount);
    }

    async openCartMenu(): Promise<void> {
        await this.clickElement(this.cartLink);
    }

    async addBookWithDiscount(): Promise<void> {
        await this.clickElement(this.booksWithDiscount.first());
    }

    async addBookWithoutDiscount(): Promise<void> {
        await this.clickElement(this.booksWithoutDiscount.first());
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

    async addSpecifiedNumberOfBooksWithSameNames(bookCount: number): Promise<void> {
        for (let i = 0; i < bookCount; i++) {
            await this.addBookWithDiscount()
        }
    }

    async addSpecifiedNumberOfBooksWithDifferentNames(bookQuantity: number): Promise<void> {
        let books = bookQuantity;
        for (const el of await this.book.elementHandles()) {
            books !== 0 ? await el.click() : "";
            books -= 1;
        }
    }

    async clearCart(): Promise<void> {
        if (await this.getBookCount() !== "0") {
            await this.addBookWithoutDiscount();
            await this.addBookWithDiscount();
            await this.openCartMenu();
            await new CartMenu(this.page).clearCart();
        }
    }
}

export default HomePage
