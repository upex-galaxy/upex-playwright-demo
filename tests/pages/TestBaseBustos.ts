import { test } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { SpaceBeyondMainPage } from './SpaceProductPageBustos';
import { BookingFormPage } from './SpaceCheckOutPageBustos';

export const beforeAll = test.beforeAll;
export const beforeEach = test.beforeEach;
export const afterEach = test.afterEach;
export const afterAll = test.afterAll;

export const story = test.describe;
export const expect = test.expect;

export { test };

export { SpaceBeyondMainPage };

//exportar una funcion para el goto(url)

export const navigateTo = async (page: Page, url: string) => {
	await page.goto(url);
};

//exportar el form ya completo
export class CompleteForm extends BookingFormPage {
	page: Page;

	constructor(page: Page) {
		super(page);
	}

	async complete() {
		await this.fillNameBox();
		await this.fillEmailBox();
		await this.fillSocialBox();
		await this.fillPhoneBox();
		//await this.uploadDoc();
	}

	async agree() {
		await this.clickAgreeBtn();
	}

	async pay() {
		await this.clickPayBtn();
	}
}
export class InvalidForm extends BookingFormPage {
	page: Page;

	constructor(page: Page) {
		super(page);
	}
	async longerName() {
		await this.longNameBox();
	}
	async invalidEmail() {
		await this.badEmail();
	}
	async invalidSSN() {
		await this.badSSN();
	}
	async invalidPhoneNumber() {
		await this.badNumberPhone();
	}
	async emptyName() {
		await this.emptyNameBox();
	}
	async emptyMail() {
		await this.emptyEmail();
	}
	async emptySSNumber() {
		await this.emptySSN();
	}
	async emptyPhone() {
		await this.emptyNumberPhone();
	}
}

export class EmptyForm extends BookingFormPage {
	page: Page;

	constructor(page: Page) {
		super(page);
	}
	async emptyNameValue() {
		await this.emptyNameBox();
		await this.fillEmailBox();
		await this.fillSocialBox();
		await this.fillPhoneBox();
	}
	async emptyEmailValue() {
		await this.fillNameBox();
		await this.emptyEmail();
		await this.fillSocialBox();
		await this.fillPhoneBox();
	}
	async emptySsnValue() {
		await this.fillNameBox();
		await this.fillEmailBox();
		await this.emptySSN();
		await this.fillPhoneBox();
	}
	async emptyPhoneValue() {
		await this.fillNameBox();
		await this.fillEmailBox();
		await this.fillSocialBox();
		await this.emptyNumberPhone();
	}
}
