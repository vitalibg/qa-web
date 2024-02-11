import {expect, test} from "@playwright/test";
import HomePage from "../pages/home-page";
import {LoginService} from "../services/login-service";
import ENV from "../utils/env"
import {CartService} from "../services/cart-service";
import CartDropDownMenu from "../pages/cart-drop-down-menu";

test.describe('Изначально корзина пустая', () => {
    const COUNT_BOOK_WITH_DISCOUNT = "1"

    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, ENV.USER_LOGIN, ENV.USER_PASSWORD);
        await CartService.clearCart(page);
    })

    test("Переход в пустую корзину", async ({page}) => {
        await new HomePage(page).openCart();

        await expect(page).toHaveURL(/.*basket/);
    });

    test("Переход в корзину с 1 неакционным товаром", async ({page}) => {
        expect(await new HomePage(page).getUserName()).toEqual(ENV.USER_LOGIN);
    });

    test("Переход в корзину с 1 акционным товаром", async ({page}) => {
        await CartService.addBookWithDiscount(page);

        const homePage = new HomePage(page);
        const cartDropDownMenu = new CartDropDownMenu(page);

        expect.soft(await homePage.getBookCount()).toEqual(COUNT_BOOK_WITH_DISCOUNT);

        await homePage.clickCartMenuItem()

        expect.soft(homePage.getFirstBookTitle()).toEqual(cartDropDownMenu.getBookTitle())
        expect.soft(homePage.getFirstBookPrice()).toEqual(cartDropDownMenu.getBookPrice())
        expect.soft(cartDropDownMenu.getBasketPrice()).toEqual(cartDropDownMenu.getBookPrice())

        await cartDropDownMenu.goToCart()

        await expect.soft(page).toHaveURL(/.*basket/);
    });

    test("Переход в корзину с 9 акционными товарами одного наименования", async ({page}) => {
        expect(await new HomePage(page).getUserName()).toEqual(ENV.USER_LOGIN);
    });
})

test.describe('Изначально корзина не пустая', () => {
    test.beforeEach(async ({page}) => {
        await LoginService.loginAs(page, ENV.USER_LOGIN, ENV.USER_PASSWORD);
        await CartService.clearCart(page);
        await CartService.addBookWithDiscount(page);
    })

    test("Переход в корзину с 9 разными товарами", async ({page}) => {
        expect(await new HomePage(page).getUserName()).toEqual(ENV.USER_LOGIN);
    });
})
