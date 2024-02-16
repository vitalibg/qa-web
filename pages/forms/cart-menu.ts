import {ElementHandle, Locator, Page} from "@playwright/test";
import BasePage from "../base-page";
import ENV from "../../utils/env";
import {getNumber} from "../../utils/helper";

class CartMenu extends BasePage {
    public readonly bookTitle: Locator;
    private readonly page: Page;
    private readonly cartDropDownMenu: Locator;
    private readonly clearCartButton: Locator;
    private readonly openCartButton: Locator;
    private readonly bookPrice: Locator;
    private readonly totalPrice: Locator;

    constructor(page: Page) {
        super();
        page.locator = this.customLocator(page, Number(ENV.RESPONSE_SPEED));
        this.page = page;
        this.cartDropDownMenu = this.page.locator("[aria-labelledby='dropdownBasket']")
        this.clearCartButton = this.page.locator(".btn-danger");
        this.openCartButton = this.page.locator("//a[@href='/basket']");
        this.bookTitle = this.page.locator("[aria-labelledby='dropdownBasket'] .basket-item-title");
        this.bookPrice = this.page.locator("[aria-labelledby='dropdownBasket'] .basket-item-price");
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

    async getCartDropDownMenu(): Promise<ElementHandle<SVGElement | HTMLElement>> {
        return this.cartDropDownMenu.elementHandle();
    }

    async getBookTitles(): Promise<string[]> {
        return await this.bookTitle.allTextContents();
    }

    async getBooksPrices(): Promise<string[]> {
        return await this.bookPrice.allTextContents()
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

export default CartMenu
