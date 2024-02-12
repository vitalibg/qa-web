import {Locator, Page} from "@playwright/test";

class CartDropDownMenu {
    private readonly clearCartButton: Locator;
    private readonly goToCartButton: Locator;
    private readonly basketPriceText: Locator;
    private readonly dropdownBasket: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        // this.clearCartButton = page.locator(".actionClearBasket > a");
        this.clearCartButton = page.getByRole("button", {name: "Очистить корзину"});
        this.goToCartButton = page.locator("//a[@href='/basket']");
        this.basketPriceText = page.locator(".basket_price");
        this.dropdownBasket = page.locator("[aria-labelledby='dropdownBasket'] ");
    }

    async clearCart() {
        await this.clearCartButton.waitFor({state: "visible"})
        await this.clearCartButton.click();
    }

    async openCart() {
        await this.goToCartButton.waitFor({state: "visible"})
        await this.goToCartButton.click()
    }

    async getBookBy(bookProperty: string) {
        return (await this.page.locator(`${this.dropdownBasket} .basket-item-${bookProperty}`).textContent()).trim();
    }

    async getBasketPrice() {
        return (await this.page.locator(`${this.dropdownBasket} ${this.basketPriceText}`).textContent()).trim();
    }
}

export default CartDropDownMenu
