import { ElementHandle, Locator, Page } from "@playwright/test";
import BasePage from "../base-page";
import ENV from "../../utils/env";
import { getNumber } from "../../utils/helper";

class CartMenu extends BasePage {
    public readonly bookTitle: Locator;
    private readonly page: Page;
    private readonly cartMenu: Locator;
    private readonly clearCartButton: Locator;
    private readonly goToCartButton: Locator;
    private readonly bookPrice: Locator;
    private readonly totalPrice: Locator;

    constructor(page: Page) {
        super();
        page.locator = this.customLocator(page, Number(ENV.RESPONSE_SPEED));
        this.page = page;
        this.cartMenu = this.page.locator("[aria-labelledby='dropdownBasket']");
        this.clearCartButton = this.page.locator(".btn-danger");
        this.goToCartButton = this.page.locator("//a[@href='/basket']");
        this.bookTitle = this.page.locator(".basket-item-title", { has: this.cartMenu });
        this.bookPrice = this.page.locator(".basket-item-price", { has: this.cartMenu });
        this.totalPrice = this.page.locator(".basket_price", { has: this.cartMenu });
    }

    async clearCart(): Promise<void> {
        await this.clickElement(this.clearCartButton);
    }

    async openCartPage(): Promise<void> {
        await this.clickElement(this.goToCartButton);
    }

    async getBookTitle(): Promise<string> {
        return await this.getText(this.bookTitle);
    }

    async getCartDropDownMenu(): Promise<ElementHandle<SVGElement | HTMLElement>> {
        return this.cartMenu.elementHandle();
    }

    async getBooksPrices(): Promise<string[]> {
        return await this.bookPrice.allTextContents();
    }

    async getCountedTotalPrice(): Promise<number> {
        const list: string[] = await this.bookPrice.allTextContents();
        return list.map((price: string) => Number.parseInt(getNumber(price))).reduce((a: number, b: number) => a + b);
    }

    async getBookPrice(): Promise<string> {
        return await this.getText(this.bookPrice);
    }

    async getTotalPrice(): Promise<string> {
        return await this.getText(this.totalPrice);
    }
}

export default CartMenu;
