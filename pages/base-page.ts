import {Locator} from "@playwright/test";

class BasePage {
    private WAIT_FIVE_SECOND = 5000;

    protected async getText(locator: Locator): Promise<string> {
        await this.getElementHandle(locator);
        return (await locator.textContent()).trim();
    }

    protected async clickElement(locator: Locator): Promise<void> {
        await this.getElementHandle(locator);
        await locator.click()
    }

    protected async typeValue(locator: Locator, text: string): Promise<void> {
        await this.getElementHandle(locator);
        await locator.clear();
        await locator.type(text);
    }

    private async getElementHandle(locator: Locator): Promise<void> {
        await locator.elementHandle({timeout: this.WAIT_FIVE_SECOND}).then(element => {
            element.waitForElementState("stable");
            element.waitForElementState("enabled");
        })
    }
}

export default BasePage
