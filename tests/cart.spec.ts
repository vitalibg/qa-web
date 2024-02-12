import {expect, test} from "@playwright/test";
import HomePage from "../pages/home-page";
import {LoginService} from "../services/login-service";
import ENV from "../utils/env"
import {CartService} from "../services/cart-service";
import CartDropDownMenu from "../pages/cart-drop-down-menu";
import {BookService} from "../services/book-service";

test.describe('Изначально корзина пустая', () => {
    const COUNT_BOOK_ONE = "1";
    const COUNT_BOOK_NINE = 9;

    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, ENV.USER_LOGIN, ENV.USER_PASSWORD);
        await CartService.clearCart(page);
    })

    test("Переход в пустую корзину", async ({page}) => {
        await new HomePage(page).clickCartMenuItem();
        await new CartDropDownMenu(page).openCart()

        await expect(page).toHaveURL(/.*basket/);
    });

    test("Переход в корзину с 1 неакционным товаром", async ({page}) => {
        await BookService.addBookWithoutDiscount(page);
        const homePage = new HomePage(page);

        expect.soft(await homePage.getBookCount()).toEqual(COUNT_BOOK_ONE);

        const firstBookTitle = await homePage.getFirstBookTitle();
        const firstBookPrice = await homePage.getFirstBookPrice();

        await homePage.clickCartMenuItem()

        const cartDropDownMenu = new CartDropDownMenu(page);

        const bookTitle = await cartDropDownMenu.getBookBy("title");
        const bookPrice = await cartDropDownMenu.getBookBy("price");
        const basketPrice = await cartDropDownMenu.getBasketPrice();

        expect.soft(firstBookTitle).toEqual(bookTitle);
        expect.soft(firstBookPrice).toEqual(bookPrice);
        expect.soft(basketPrice).toEqual(bookPrice)

        await cartDropDownMenu.openCart()

        await expect.soft(page).toHaveURL(/.*basket/);
    });

    test("Переход в корзину с 1 акционным товаром", async ({page}) => {
        await BookService.addBookWithDiscount(page);
        const homePage = new HomePage(page);

        expect.soft(await homePage.getBookCount()).toEqual(COUNT_BOOK_ONE);

        await homePage.clickCartMenuItem()

        const cartDropDownMenu = new CartDropDownMenu(page);

        expect.soft(await homePage.getFirstBookTitle()).toEqual(await cartDropDownMenu.getBookBy("title"))
        expect.soft(await homePage.getFirstBookPrice()).toEqual(await cartDropDownMenu.getBookBy("price"))
        expect.soft(await cartDropDownMenu.getBasketPrice()).toEqual(await cartDropDownMenu.getBookBy("price"))

        await cartDropDownMenu.openCart()

        await expect.soft(page).toHaveURL(/.*basket/);
    });

    test("Переход в корзину с 9 акционными товарами одного наименования", async ({page}) => {
        await BookService.addTargetBooksCountWithOneName(page, COUNT_BOOK_NINE)
        const homePage = new HomePage(page);

        expect.soft(await homePage.getBookCount()).toEqual(COUNT_BOOK_NINE);

        await homePage.clickCartMenuItem();

        const cartDropDownMenu = new CartDropDownMenu(page);

        expect.soft(await homePage.getFirstBookTitle()).toEqual(await cartDropDownMenu.getBookBy("title"))
        expect.soft(await homePage.getFirstBookPrice()).toEqual(await cartDropDownMenu.getBookBy("price"))
        expect.soft(await cartDropDownMenu.getBasketPrice()).toEqual(await cartDropDownMenu.getBookBy("price"))

        await cartDropDownMenu.openCart()

        await expect.soft(page).toHaveURL(/.*basket/);
    });
})

test.describe('Изначально корзина не пустая', () => {
    // test.beforeEach(async ({page}) => {
    //     await LoginService.loginAs(page, ENV.USER_LOGIN, ENV.USER_PASSWORD);
    //     await CartService.clearCart(page);
    //     // await CartService.addBookWithDiscount(page);
    // })
    //
    // test("Переход в корзину с 9 разными товарами", async ({page}) => {
    //     expect(await new HomePage(page).getUserName()).toEqual(ENV.USER_LOGIN);
    // });
})
