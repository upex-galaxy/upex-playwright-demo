import type { Locator, Page } from '@playwright/test';

export class FillFormAndSubmitPage {
	page: Page;
	fullNameInput: () => Locator;
	emailInput: () => Locator;
	currentAddressInput: () => Locator;
	permanentAddressInput: () => Locator;
	submitButton: () => Locator;
	outputArea: () => Locator;
	outputName: () => Locator;
	outputEmail: () => Locator;
	outputCurrentAddress: () => Locator;
	outputPermanentAddress: () => Locator;
	redBorderEmailField: () => Locator;

	constructor(driver: Page) {
		this.page = driver;
		this.fullNameInput = () => this.page.locator('#userName');
		this.emailInput = () => this.page.locator('#userEmail');
		this.currentAddressInput = () => this.page.locator('#currentAddress');
		this.permanentAddressInput = () => this.page.locator('#permanentAddress');
		this.submitButton = () => this.page.locator('#submit');
		this.outputArea = () => this.page.locator('#output');
		this.outputName = () => this.page.locator('p#name');
		this.outputEmail = () => this.page.locator('p#email');
		this.outputCurrentAddress = () => this.page.locator('p#currentAddress');
		this.outputPermanentAddress = () => this.page.locator('p#permanentAddress');
		this.redBorderEmailField = () => this.page.locator('#userEmail[class*=field-error]');
	}
	async clearForm() {
		await this.fullNameInput().fill('');
		await this.emailInput().fill('');
		await this.currentAddressInput().fill('');
		await this.permanentAddressInput().fill('');
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

	/* fillForm() allows avoiding calling each method independently to fill all fields.
	The parameter is An object, "?" means that is not required*/
	async fillForm(data: { name?: string; email?: string; currentAddress?: string; permanentAddress?: string }) {
		if (data.name) await this.fillName(data.name);
		if (data.email) await this.fillEmail(data.email);
		if (data.currentAddress) await this.fillCurrentAddress(data.currentAddress);
		if (data.permanentAddress) await this.fillPermanentAddress(data.permanentAddress);
	}

	// Methods for checking output text
	async getOutputName() {
		return await this.outputName().textContent();
	}

	async getOutputEmail() {
		return await this.outputEmail().textContent();
	}

	async getOutputCurrentAddress() {
		return await this.outputCurrentAddress().textContent();
	}

	async getOutputPermanentAddress() {
		return await this.outputPermanentAddress().textContent();
	}
}
