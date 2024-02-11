import {Locator, Page} from "@playwright/test";

class CartPage {
    private readonly clearCartButton: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.clearCartButton = page.locator(".btn-danger");
    }

    async clearCart() {
        await this.clearCartButton.click();
    }
}

export default CartPage
