import {expect, test} from "@playwright/test";
import HomePage from "../pages/home-page";
import {LoginService} from "../services/login-service";
import ENV from "../utils/env"
import CartMenu from "../pages/cart-menu";
import {getNumber} from "../utils/helper";

test.describe('Пустая корзина', () => {
    const ONE_BOOK = "1";
    const NINE_BOOKS = "9";

    let homePage: HomePage;
    let cartMenu: CartMenu;

    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, ENV.USER_LOGIN, ENV.USER_PASSWORD);
        homePage = new HomePage(page);
        cartMenu = new CartMenu(page);
        await homePage.clearCart()
    })

    test("Переход в пустую корзину", async ({page}) => {
        await homePage.openCartMenu();
        await cartMenu.openCartPage()

        await expect(page).toHaveURL(/.*basket/);
    });

    test("Переход в корзину с 1 неакционным товаром", async ({page}) => {
        await homePage.addBookWithoutDiscount();

        expect.soft(await homePage.getBookCount()).toEqual(ONE_BOOK);

        await homePage.openCartMenu()

        expect.soft(await homePage.getFirstBookTitleWithoutDiscount()).toEqual(await cartMenu.getBookTitle());
        expect.soft(await homePage.getFirstBookPriceWithoutDiscount()).toContain(getNumber(await cartMenu.getBookPrice()));
        expect.soft(await cartMenu.getTotalPrice()).toContain(getNumber(await cartMenu.getBookPrice()));

        await cartMenu.openCartPage()

        await expect.soft(page).toHaveURL(/.*basket/);
    });

    test("Переход в корзину с 1 акционным товаром", async ({page}) => {
        await homePage.addBookWithDiscount();

        expect.soft(await homePage.getBookCount()).toEqual(ONE_BOOK);

        await homePage.openCartMenu()

        expect.soft(await homePage.getFirstBookTitleWithDiscount()).toEqual(await cartMenu.getBookTitle());
        expect.soft(await homePage.getFirstBookPriceWithDiscount()).toContain(getNumber(await cartMenu.getBookPrice()));
        expect.soft(await cartMenu.getTotalPrice()).toContain(getNumber(await cartMenu.getBookPrice()));

        await cartMenu.openCartPage()

        await expect.soft(page).toHaveURL(/.*basket/);
    });

    test("Переход в корзину с 9 акционными товарами одного наименования", async ({page}) => {
        await homePage.addSpecifiedNumberOfBooksWithSameNames(Number(NINE_BOOKS))

        expect.soft(await homePage.getBookCount()).toEqual(NINE_BOOKS);

        await homePage.openCartMenu();

        expect.soft(await homePage.getFirstBookTitleWithDiscount()).toEqual(await cartMenu.getBookTitle());
        expect.soft(await homePage.getFirstBookPriceWithDiscount()).toContain(getNumber(await cartMenu.getBookPrice()));
        expect.soft(await cartMenu.getTotalPrice()).toEqual(Number(getNumber(await cartMenu.getBookPrice())) * Number(NINE_BOOKS));

        await cartMenu.openCartPage()

        await expect.soft(page).toHaveURL(/.*basket/);
    });
})

test.describe('Не пустая корзина', () => {
    const EIGHT_BOOKS = 8;
    const NINE_BOOKS = "9";

    let homePage: HomePage;
    let cartMenu: CartMenu;

    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, ENV.USER_LOGIN, ENV.USER_PASSWORD);
        homePage = new HomePage(page);
        cartMenu = new CartMenu(page);
        await homePage.clearCart();
        await homePage.addBookWithDiscount();
    })

    test("Переход в корзину с 9 разными товарами", async ({page}) => {
        await homePage.addSpecifiedNumberOfBooksWithDifferentNames(EIGHT_BOOKS);

        expect.soft(await homePage.getBookCount()).toEqual(NINE_BOOKS);

        await homePage.openCartMenu();

        expect.soft(await homePage.getFirstBookTitleWithDiscount()).toEqual(await cartMenu.getBookTitle());
        expect.soft(await homePage.getFirstBookPriceWithDiscount()).toContain(getNumber(await cartMenu.getBookPrice()));
        expect.soft(await cartMenu.getTotalPrice()).toContain(getNumber(await cartMenu.getBookPrice()));

        await cartMenu.openCartPage()

        await expect.soft(page).toHaveURL(/.*basket/);
    });
})
