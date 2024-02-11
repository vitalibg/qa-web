import HomePage from "../pages/home-page";
import {Page} from "playwright-core";

export abstract class CartService {
    public static async clearCart(page: Page) {
        const homePage = new HomePage(page);
        if (await homePage.getBookCount() !== "0") {
            await homePage.clearCart();
        }
    }

    public static async addBookWithDiscount(page: Page) {
        const homePage = new HomePage(page);
        await homePage.addFirstBookWithDiscount()
    }
}
