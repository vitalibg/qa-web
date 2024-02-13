import {Locator, Page} from "@playwright/test";
import BasePage from "./base-page";

class CartDropDownMenu extends BasePage {
    private readonly page: Page;
    private readonly clearCartButton: Locator;
    private readonly openCartButton: Locator;
    private readonly bookTitle: Locator;
    private readonly bookPrice: Locator;
    private readonly totalPrice: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.clearCartButton = page.locator(".btn-danger");
        this.openCartButton = page.locator("//a[@href='/basket']");
        this.bookTitle = page.locator("[aria-labelledby='dropdownBasket'] .basket-item-title");
        this.bookPrice = page.locator("[aria-labelledby='dropdownBasket'] .basket-item-price");
        this.totalPrice = page.locator("[aria-labelledby='dropdownBasket'] .basket_price");
    }

    async clearCart(): Promise<void> {
        await this.clickElement(this.clearCartButton);
    }

    async openCart(): Promise<void> {
        await this.clickElement(this.openCartButton);
    }

    async getBookTitle(): Promise<string> {
        return await this.getText(this.bookTitle);
    }

    async getBookPrice(): Promise<string> {
        return await this.getText(this.bookPrice);
    }

    async getTotalPrice(): Promise<string> {
        return await this.getText(this.totalPrice);
    }
}

export default CartDropDownMenu
