import type { Page, Locator } from '@playwright/test';

export class BrowserWindowsPage {
	readonly page: Page;
	readonly newTabButton: Locator;
	readonly newWindowButton: Locator;
	readonly newWindowMessageButton: Locator;
	readonly sampleHeading: Locator;

	constructor(page: Page) {
		this.page = page;
		this.newTabButton = page.getByRole('button', { name: 'New Tab' });
		this.newWindowButton = page.getByRole('button', { name: 'New Window', exact: true });
		this.newWindowMessageButton = page.getByRole('button', { name: 'New Window Message' });
		this.sampleHeading = page.locator('#sampleHeading');
	}

	async clickNewTabButtonAndOpenPopup() {
		const newTabPromise = this.page.waitForEvent('popup');
		await this.newTabButton.click();
		return await newTabPromise;
	}

	async clickNewWindowButtonAndOpenPopup() {
		const newWindowPromise = this.page.waitForEvent('popup');
		await this.newWindowButton.click();
		return await newWindowPromise;
	}

	async clickNewWindowMessageButtonAndOpenPopup() {
		const newWindowMessagePromise = this.page.waitForEvent('popup');
		await this.newWindowMessageButton.click();
		return await newWindowMessagePromise;
	}
}
