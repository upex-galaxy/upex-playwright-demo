import type { Locator, Page } from '@playwright/test';

export class FillFormAndSubmitPage {
	page: Page;
	fullNameInput: () => Locator;
	emailInput: () => Locator;
	currentAddressInput: () => Locator;
	permanentAddressInput: () => Locator;
	submitButton: () => Locator;

	constructor(driver: Page) {
		this.page = driver;
		this.fullNameInput = () => this.page.locator('#userName');
		this.emailInput = () => this.page.locator('#userEmail');
		this.currentAddressInput = () => this.page.locator('#currentAddress');
		this.permanentAddressInput = () => this.page.locator('#permanentAddress');
		this.submitButton = () => this.page.locator('#submit');
	}

	async fillName(name: string) {
		await this.fullNameInput().fill(name);
	}

	async fillEmail(email: string) {
		await this.emailInput().fill(email);
	}

	async fillCurrentAddress(address: string) {
		await this.currentAddressInput().fill(address);
	}

	async fillPermanentAddress(address: string) {
		await this.permanentAddressInput().fill(address);
	}

	async submitForm() {
		await this.submitButton().click();
	}

	async clearForm() {
		await this.fullNameInput().fill('');
		await this.emailInput().fill('');
		await this.currentAddressInput().fill('');
		await this.permanentAddressInput().fill('');
	}
}
