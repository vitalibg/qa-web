import { expect, test } from "@playwright/test";
import HomePage from "../pages/home-page";
import { LoginService } from "../services/login-service";
import CartMenu from "../pages/forms/cart-menu";
import { getNumber } from "../utils/helper";
import User from "../entity/user/user";

test.describe("Изначально пустая корзина", () => {
    const ONE_BOOK = "1";
    const NINE_BOOKS = "9";

    let homePage: HomePage;
    let cartMenu: CartMenu;

    test.beforeEach("Предусловие", async ({ page }) => {
        await test.step("Пользователь авторизован в системе", async () => {
            await LoginService.loginAs(page, new User());
        });

        await test.step("Корзина пуста", async () => {
            homePage = new HomePage(page);
            cartMenu = new CartMenu(page);
            await homePage.clearCart();
        });
    });

    test("Тест-кейс: Переход в пустую корзину", async ({ page }) => {
        await test.step("Кликнуть на иконку корзины", async () => {
            await homePage.openCartMenu();
            expect(await cartMenu.getCartDropDownMenu()).not.toBeFalsy();
        });

        await test.step("В окне корзины нажать кнопку 'Перейти в корзину'", async () => {
            await cartMenu.openCartPage();
            await expect.soft(page).toHaveURL(/.*basket/);
        });
    });

    test("Тест-кейс: Переход в корзину с 1 неакционным товаром", async ({ page }) => {
        await test.step("Добавить в корзину один товар без скидки", async () => {
            await homePage.addBookWithoutDiscount();
            expect.soft(await homePage.getBookCount()).toEqual(ONE_BOOK);
        });

        await test.step("Нажать на иконку корзины", async () => {
            await homePage.openCartMenu();
            expect.soft(await homePage.getFirstBookTitleWithoutDiscount()).toEqual(await cartMenu.getBookTitle());
            expect.soft(await homePage.getFirstBookPriceWithoutDiscount()).toContain(getNumber(await cartMenu.getBookPrice()));
            expect.soft(await cartMenu.getTotalPrice()).toContain(getNumber(await cartMenu.getBookPrice()));
        });

        await test.step("В окне корзины нажать кнопку 'Перейти в корзину'", async () => {
            await cartMenu.openCartPage();
            await expect.soft(page).toHaveURL(/.*basket/);
        });
    });

    test("Тест-кейс: Переход в корзину с 1 акционным товаром", async ({ page }) => {
        await test.step("Добавить в корзину один товар со скидкой", async () => {
            await homePage.addBookWithDiscount();
            expect.soft(await homePage.getBookCount()).toEqual(ONE_BOOK);
        });

        await test.step("Нажать на иконку корзины", async () => {
            await homePage.openCartMenu();
            expect.soft(await homePage.getFirstBookTitleWithDiscount()).toEqual(await cartMenu.getBookTitle());
            expect.soft(await homePage.getFirstBookPriceWithDiscount()).toContain(getNumber(await cartMenu.getBookPrice()));
            expect.soft(await cartMenu.getTotalPrice()).toContain(getNumber(await cartMenu.getBookPrice()));
        });

        await test.step("В окне корзины нажать кнопку 'Перейти в корзину'", async () => {
            await cartMenu.openCartPage();
            await expect.soft(page).toHaveURL(/.*basket/);
        });
    });

    test("Тест-кейс: Переход в корзину с 9 акционными товарами одного наименования", async ({ page }) => {
        await test.step("Добавить в корзину 9 товаров одного наименования со скидкой", async () => {
            await homePage.addSpecifiedNumberOfBooksWithSameNames(Number(NINE_BOOKS));
            expect.soft(await homePage.getBookCount()).toEqual(NINE_BOOKS);
        });

        await test.step("Нажать на иконку корзины", async () => {
            await homePage.openCartMenu();
            expect.soft(await homePage.getFirstBookTitleWithDiscount()).toEqual(await cartMenu.getBookTitle());
            expect.soft(await homePage.getFirstBookPriceWithDiscount()).toContain(getNumber(await cartMenu.getBookPrice()));
            expect.soft(await cartMenu.getTotalPrice()).toEqual(Number(getNumber(await cartMenu.getBookPrice())) * Number(NINE_BOOKS));
        });

        await test.step("В окне корзины нажать кнопку 'Перейти в корзину'", async () => {
            await cartMenu.openCartPage();
            await expect.soft(page).toHaveURL(/.*basket/);
        });
    });
});

test.describe("Изначально не пустая корзина", () => {
    const EIGHT_BOOKS = 8;
    const NINE_BOOKS = "9";

    let homePage: HomePage;
    let cartMenu: CartMenu;

    test.beforeEach("Предусловие", async ({ page }) => {
        await test.step("Пользователь авторизован в системе", async () => {
            await LoginService.loginAs(page, new User());
        });

        await test.step("В корзине 1 акционный товар", async () => {
            homePage = new HomePage(page);
            cartMenu = new CartMenu(page);
            await homePage.clearCart();
            await homePage.addBookWithDiscount();
        });
    });

    test("Тест-кейс: Переход в корзину с 9 разными товарами", async ({ page }) => {
        let bookTitleList: string[];

        await test.step("Добавить в корзину ещё 8 разных товаров", async () => {
            bookTitleList = await homePage.getBooksWithDifferentNames(EIGHT_BOOKS);
            expect.soft(await homePage.getBookCount()).toEqual(NINE_BOOKS);
        });

        await test.step("Нажать на иконку корзины", async () => {
            await homePage.openCartMenu();
            await expect.soft(cartMenu.bookTitle).toContainText(bookTitleList);
            expect.soft(await cartMenu.getBooksPrices()).not.toBeFalsy();
            expect.soft(await cartMenu.getTotalPrice()).toEqual(cartMenu.getCountedTotalPrice());
        });

        await test.step("В окне корзины нажать кнопку 'Перейти в корзину'", async () => {
            await cartMenu.openCartPage();
            await expect.soft(page).toHaveURL(/.*basket/);
        });
    });
});
