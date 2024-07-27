import type { Page, Locator } from '@playwright/test';

export class DestinationsPage {
	readonly page: Page;
	readonly nextDestinationHeading: Locator;

	constructor(page: Page) {
		this.page = page;
		this.nextDestinationHeading = page.getByRole('heading', { name: 'Your next destination' });
	}

	async validateNextDestinationVisible() {
		const destinationHeading = this.page.locator('h1:has-text("YOUR NEXT DESTINATION")');
		await destinationHeading.isVisible();
	}
}
