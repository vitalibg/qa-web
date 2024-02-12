import {Page} from "playwright-core";
import HomePage from "../pages/home-page";

export abstract class BookService {
    public static async addBookWithoutDiscount(page: Page) {
        await new HomePage(page).addBookWithoutDiscount();
    }

    public static async addBookWithDiscount(page: Page) {
        await new HomePage(page).addBookWithDiscount();
    }

    public static async addTargetBooksCountWithOneName(page: Page, bookCount: number) {
        const homePage = new HomePage(page);

        for (let i = 0; i < bookCount; i++) {
            await homePage.addBookWithDiscount();
        }
    }
}
