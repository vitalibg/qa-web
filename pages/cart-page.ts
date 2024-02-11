import {Page} from "@playwright/test";

class CartPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}

export default CartPage
