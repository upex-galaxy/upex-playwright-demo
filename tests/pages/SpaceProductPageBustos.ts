import type { Page, Locator } from '@playwright/test';
import { ReactPage } from './ReactPage';

export class SpaceBeyondMainPage extends ReactPage {
	page: Page;
	bookRandomButton: Locator;
	loadMoreButton: Locator;

	constructor(page: Page) {
		super(page);
		this.bookRandomButton = page.locator('button', { hasText: 'Book' });
		this.loadMoreButton = page.locator('button', { hasText: 'Load more' });
	}

	async clickLoadMoreButton(): Promise<void> {
		await this.loadMoreButton.click();
	}

	async clickRandomBook(): Promise<void> {
		const count = await this.bookRandomButton.count();
		const randomSelect = Math.floor(Math.random() * count);
		await this.bookRandomButton.nth(randomSelect).click();
	}
}
