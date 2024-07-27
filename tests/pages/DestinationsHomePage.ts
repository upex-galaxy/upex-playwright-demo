import type { Page, Locator } from '@playwright/test';

export class HomePage {
	readonly page: Page;
	readonly departureDateInput: Locator;
	readonly returnDateInput: Locator;
	readonly confirmButton: Locator;
	readonly adultsField: Locator;
	readonly childrenField: Locator;
	readonly selectDestinationButton: Locator;
	readonly calendar: Locator;

	constructor(page: Page) {
		this.page = page;
		this.departureDateInput = page.locator('input[type="text"]').first();
		this.returnDateInput = page.locator('input[type="text"]').nth(1);
		this.confirmButton = page.getByRole('button', { name: 'Ok', exact: true });
		this.adultsField = page.locator('div').filter({ hasText: /^Adults \(18\+\)1234$/ }).getByRole('textbox');
		this.childrenField = page.locator('div').filter({ hasText: /^Children \(0-7\)1234$/ }).getByRole('textbox');
		this.selectDestinationButton = page.getByRole('button', { name: 'Select Destination' });
		this.calendar = page.locator('.theme__calendar___1I5OE');
	}

	async selectDepartureDate(date: string) {
		await this.departureDateInput.click();
		const dateButton = this.calendar.locator('div[data-react-toolbox="day"]').locator(`text=${date}`);
		await dateButton.waitFor({ state: 'visible', timeout: 10000 });
		await dateButton.click();
		await this.confirmButton.click();
	}

	async selectReturnDate(date: string) {
		await this.returnDateInput.click();
		const dateButton = this.calendar.locator('div[data-react-toolbox="day"]').locator(`text=${date}`).first();
		await dateButton.waitFor({ state: 'visible', timeout: 10000 });
		await dateButton.click();
		await this.confirmButton.click();
	}

	async selectAdults(count: string) {
		await this.adultsField.click();
		await this.page.getByText(count, { exact: true }).first().click();
	}

	async selectChildren(count: string) {
		await this.childrenField.click();
		await this.page.getByText(count, { exact: true }).nth(1).click();
	}

	async clickSelectDestination() {
		await this.selectDestinationButton.click();
	}
}
