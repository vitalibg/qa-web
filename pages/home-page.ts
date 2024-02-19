import { Page } from "playwright-core";
import CartMenu from "./forms/cart-menu";
import { Locator } from "@playwright/test";
import BasePage from "./base-page";
import ENV from "../utils/env";

class HomePage extends BasePage {
    private readonly page: Page;
    private readonly cartCountLabel: Locator;
    private readonly cartMenu: Locator;
    private readonly buyBookButton: Locator;
    private readonly bookTitle: Locator;
    private readonly buyBookButtonWithDiscount: Locator;
    private readonly buyBookButtonWithoutDiscount: Locator;
    private readonly bookTitleWithoutDiscount: Locator;
    private readonly bookPriceWithoutDiscount: Locator;
    private readonly bookTitleWithDiscount: Locator;
    private readonly bookPriceWithDiscount: Locator;

    constructor(page: Page) {
        super();
        page.locator = this.customLocator(page, Number(ENV.RESPONSE_SPEED));
        this.page = page;
        this.cartCountLabel = this.page.locator(".basket-count-items");
        this.cartMenu = this.page.locator("#dropdownBasket");
        this.buyBookButton = this.page.locator(".actionBuyProduct.btn");
        this.bookTitle = this.page.locator(".product_name.h6");
        this.buyBookButtonWithDiscount = this.page.locator(".hasDiscount .actionBuyProduct");
        this.buyBookButtonWithoutDiscount = this.page.locator(".note-item:not(.hasDiscount) .actionBuyProduct");
        this.bookTitleWithoutDiscount = this.page.locator(".note-item:not(.hasDiscount) .product_name");
        this.bookPriceWithoutDiscount = this.page.locator(".note-item:not(.hasDiscount) .product_price");
        this.bookTitleWithDiscount = this.page.locator(".hasDiscount .product_name");
        this.bookPriceWithDiscount = this.page.locator(".hasDiscount .product_price");
    }

    async getBookCount(): Promise<string> {
        return await this.getText(this.cartCountLabel);
    }

    async openCartMenu(): Promise<void> {
        await this.clickElement(this.cartMenu);
    }

    async addBookWithDiscount(): Promise<void> {
        await this.clickElement(this.buyBookButtonWithDiscount.first());
    }

    async addBookWithoutDiscount(): Promise<void> {
        await this.clickElement(this.buyBookButtonWithoutDiscount.first());
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

    async addSpecifiedNumberOfBooksWithSameNames(bookCount: number): Promise<void> {
        for (let i = 0; i < bookCount; i++) {
            await this.addBookWithDiscount();
        }
    }

    async getBooksWithDifferentNames(bookQuantity: number): Promise<string[]> {
        const bookTitleList: string[] = [];
        let clickedBookCount: number = 0;
        let count: number = 0;
        const existBook = await this.bookTitle.first().textContent();

        while (clickedBookCount < bookQuantity) {
            if (existBook !== await this.bookTitle.nth(count).textContent()) {
                await this.clickElement(this.buyBookButton.nth(count));
                bookTitleList.push(await this.bookTitle.nth(count).textContent());
                clickedBookCount++;
                count++;
                continue;
            }
            count++;
        }

        return bookTitleList;
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

export default HomePage;
