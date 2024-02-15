import {Locator, Page} from "@playwright/test";
import BasePage from "./base-page";
import ENV from "../utils/env";

class CartMenu extends BasePage {
    private readonly page: Page;
    private readonly cartDropDownMenu: Locator;
    private readonly clearCartButton: Locator;
    private readonly openCartButton: Locator;
    private readonly bookTitle: Locator;
    private readonly bookTitles: Locator;
    private readonly bookPrice: Locator;
    private readonly bookPrices: Locator;
    private readonly totalPrice: Locator;

    constructor(page: Page) {
        super();
        page.locator = this.customLocator(page, Number(ENV.RESPONSE_SPEED));
        this.page = page;
        this.cartDropDownMenu = this.page.locator("[aria-labelledby='dropdownBasket']")
        this.clearCartButton = this.page.locator(".btn-danger");
        this.openCartButton = this.page.locator("//a[@href='/basket']");
        this.bookTitle = this.page.locator("[aria-labelledby='dropdownBasket'] .basket-item-title");
        this.bookTitles = this.page.locator(".basket-item .basket-item-title");
        this.bookPrice = this.page.locator("[aria-labelledby='dropdownBasket'] .basket-item-price");
        this.bookPrices = this.page.locator(".basket-item .basket-item-price");
        this.totalPrice = this.page.locator("[aria-labelledby='dropdownBasket'] .basket_price");
    }

    async clearCart(): Promise<void> {
        await this.clickElement(this.clearCartButton);
    }

    async openCartPage(): Promise<void> {
        await this.clickElement(this.openCartButton);
    }

    async getBookTitle(): Promise<string> {
        return await this.getText(this.bookTitle);
    }

    async getCartDropDownMenu() {
        return this.cartDropDownMenu.elementHandle();
    }

    async getBookTitles() {
        let element: string[];
        for (const el of await this.bookTitles.elementHandles()) {
            element.push(await el.textContent());
        }
        console.log("element", element)
        console.log("this.bookTitles", await this.bookTitles);
        return element;
    }

    async getBookPrices() {
        return this.bookPrices;
    }

    async getBookPrice(): Promise<string> {
        return await this.getText(this.bookPrice);
    }

    async getTotalPrice(): Promise<string> {
        return await this.getText(this.totalPrice);
    }
}

export default CartMenu
