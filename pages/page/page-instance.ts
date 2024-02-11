import {Page} from 'playwright-core';

export class PageInstance {
    private static pageInstance: PageInstance;
    private readonly pageInst: Page;

    private constructor(page: Page) {
        this.pageInst = page;
    }

    static getInstance(page?: Page) {
        if (this.pageInstance) return this.pageInstance.pageInst;
        else return (this.pageInstance = new PageInstance(page!)).pageInst;
    }
}
