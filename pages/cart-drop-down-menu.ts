import {Locator, Page} from "@playwright/test";

class CartDropDownMenu {
    private readonly clearCartButton: Locator;
    private readonly goToCartButton: Locator;
    private readonly basketPriceText: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.clearCartButton = page.locator(".btn-danger");
        this.goToCartButton = page.locator("//a[@href='/basket']");
        this.basketPriceText = page.locator(".basket_price");
    }

    async clearCart() {
        await this.clearCartButton.click();
    }

    async goToCart() {
        await this.goToCartButton.click()
    }

    async getBookTitle() {
        return (await this.page.locator("[aria-labelledby='dropdownBasket'] .basket-item-title").textContent()).trim()
    }

    async getBookPrice() {
        return (await this.page.locator("[aria-labelledby='dropdownBasket'] .basket-item-price").textContent()).trim()
    }

    async getBasketPrice() {
        return (await this.page.locator("[aria-labelledby='dropdownBasket'] .basket_price").textContent()).trim()
    }
}

export default CartDropDownMenu
