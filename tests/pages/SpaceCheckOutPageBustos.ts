import type { Locator, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ReactPage } from './ReactPage';
import path from 'path';

export class BookingFormPage extends ReactPage {
	page: Page;
	nameBox: Locator;
	emailBox: Locator;
	socialNumBox: Locator;
	phoneNumBox: Locator;
	dropDocumentBox: Locator;
	agreeBtn: Locator;
	payBtn: Locator;

	constructor(page: Page) {
		super(page);
		this.nameBox = page
			.locator('div')
			.filter({ hasText: /^Name0\/30$/ })
			.getByRole('textbox');
		this.emailBox = page.locator('input[type="email"]');
		this.socialNumBox = page
			.locator('div')
			.filter({ hasText: /^Social Security Number$/ })
			.getByRole('textbox');
		this.phoneNumBox = page.locator('input[type="tel"]');
		this.dropDocumentBox = page.getByText('Or click to upload');
		this.agreeBtn = page.getByText('I agree to the terms and conditions');
		this.payBtn = page.getByText('PAY NOW');
	}

	async uploadDoc() {
		const filePath = path.join('tests/data/upexlogo.png');
		await this.dropDocumentBox.click();
		await this.dropDocumentBox.setInputFiles(filePath);
	}

	async fillNameBox() {
		const name = faker.person.fullName();
		await this.nameBox.click();
		await this.nameBox.fill(name);
	}
	async fillEmailBox() {
		const email = faker.internet.email();
		await this.emailBox.fill(email);
	}
	async fillSocialBox() {
		const socialNum = faker.helpers.replaceSymbols('###-##-####');
		await this.socialNumBox.fill(socialNum);
	}
	async fillPhoneBox() {
		const phoneNum = faker.helpers.replaceSymbols('(220) ###-####');
		await this.phoneNumBox.fill(phoneNum);
	}
	async clickAgreeBtn() {
		const clickBtn = this.agreeBtn;
		await clickBtn.click();
	}
	async clickPayBtn() {
		const clickBtn = this.payBtn;
		await clickBtn.click();
	}
	//
	async longNameBox() {
		const longName = faker.lorem.words(10);
		await this.nameBox.click();
		await this.nameBox.fill(longName);
	}
	async badEmail() {
		const badMail = faker.lorem.word();
		await this.emailBox.fill(badMail);
	}
	async badSSN() {
		const badNumber = faker.helpers.replaceSymbols('#########');
		await this.socialNumBox.fill(badNumber);
	}
	async badNumberPhone() {
		const badPhone = faker.phone.number();
		await this.phoneNumBox.fill(badPhone);
	}
	//
	async emptyNameBox() {
		const emptyName = '';
		await this.nameBox.fill(emptyName);
		await this.nameBox.press('Enter');
	}
	async emptyEmail() {
		const emptyMail = '';
		await this.emailBox.fill(emptyMail);
		//await this.emailBox.press('Enter');
	}
	async emptySSN() {
		const emptyNum = '';
		await this.socialNumBox.fill(emptyNum);
		await this.socialNumBox.press('Enter');
	}
	async emptyNumberPhone() {
		const emptyPhone = '';
		await this.phoneNumBox.fill(emptyPhone);
		await this.phoneNumBox.press('Enter');
	}
}
