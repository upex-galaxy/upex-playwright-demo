import { story } from '@pages/TestBase';
import { test, expect } from '@playwright/test';
import { FillFormAndSubmitPage } from '@pages/GX3-5651_FillTextboxAndSubmitPage';
import { faker } from '@faker-js/faker';
import data from '@data/GX3-5651_FillTextBoxAndSubmit.json' assert { type: 'json' };

story('GX3-565 | ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	let fillAndSubmitPage: FillFormAndSubmitPage;

	test.beforeEach(async ({ page }) => {
		fillAndSubmitPage = new FillFormAndSubmitPage(page);
		await page.goto('/text-box');
		await fillAndSubmitPage.clearForm();
	});

	function generateRandomData() {
		return {
			randomName: faker.person.fullName(),
			randomEmail: faker.internet.email(),
			randomCurrentAddress: faker.location.streetAddress(),
			randomPermanentAddress: faker.location.streetAddress()
		};
	}

	test('TC01: Should submit the form with all fields filled with valid data', async () => {
		const { randomName, randomEmail, randomCurrentAddress, randomPermanentAddress } = generateRandomData(); //Extract the generated random data

		// fillForm() allows avoiding calling each method independently to fill all fields
		await fillAndSubmitPage.fillForm({
			name: randomName,
			email: randomEmail,
			currentAddress: randomCurrentAddress,
			permanentAddress: randomPermanentAddress
		});
		await fillAndSubmitPage.submitForm();

		await expect(fillAndSubmitPage.outputArea()).toBeVisible();
		expect(await fillAndSubmitPage.getOutputName()).toContain(randomName);
		expect(await fillAndSubmitPage.getOutputEmail()).toContain(randomEmail);
		expect(await fillAndSubmitPage.getOutputCurrentAddress()).toContain(randomCurrentAddress);
		expect(await fillAndSubmitPage.getOutputPermanentAddress()).toContain(randomPermanentAddress);
	});

	test('TC02: Should submit the form with all fields empty', async () => {
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
	});

	test('TC03: Should NOT submit the form when the Email field does not contain “@”', async () => {
		await fillAndSubmitPage.fillEmail(data.invalidEmails['notContain@']);
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
		await expect(fillAndSubmitPage.redBorderEmailField()).toBeVisible();
	});

	test('TC04: Should NOT submit the form when the Email field does not contain (minimum) 1 alphanumeric character before @', async () => {
		await fillAndSubmitPage.fillEmail(data.invalidEmails['notCharacterBefore@']);
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
		await expect(fillAndSubmitPage.redBorderEmailField()).toBeVisible();
	});

	test('TC05: Should NOT submit the form when the Email field does not contain (minimum) 1 alphanumeric character after @', async () => {
		await fillAndSubmitPage.fillEmail(data.invalidEmails['notCharacterAfter@']);
		await fillAndSubmitPage.fillName(data.name['nameTC05-Alphanumeric-Space']);
		await fillAndSubmitPage.fillPermanentAddress(data.permanentAddress['permanentAddressTC05-SpecialCharacters-Spaces']);
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
		await expect(fillAndSubmitPage.redBorderEmailField()).toBeVisible();
	});
	test('TC06: Should NOT submit the form when the Email field does not contain “.” after 1 alphanumeric character after @', async () => {
		await fillAndSubmitPage.fillEmail(data.invalidEmails['not.Point']);
		await fillAndSubmitPage.fillName(data.name['nameTC06-Space-Point']);
		await fillAndSubmitPage.fillCurrentAddress(data.currentAddress['currentAddressTC06-SpecialCharacters-Spaces']);
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
		await expect(fillAndSubmitPage.redBorderEmailField()).toBeVisible();
	});
	test('TC07: Should NOT submit the form when the Email field does not contain (minimum) 2 alphanumeric characters after . the point', async () => {
		await fillAndSubmitPage.fillEmail(data.invalidEmails['not2CharacterAfter.Point']);
		await fillAndSubmitPage.fillName(data.name['nameTC07-1character']);
		await fillAndSubmitPage.fillCurrentAddress(data.currentAddress['currentAddressTC07-extraSpaces']);
		await fillAndSubmitPage.fillPermanentAddress(data.permanentAddress['permanentAddressTC07-capitalLetters']);
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
		await expect(fillAndSubmitPage.redBorderEmailField()).toBeVisible();
	});
	test('TC08: Should NOT submit the form when the Email field contains whitespace in the Email address', async () => {
		await fillAndSubmitPage.fillEmail(data.invalidEmails['containsWhitespace']);
		await fillAndSubmitPage.fillName(data.name['nameTC08-SpecialCharacters']);
		await fillAndSubmitPage.fillCurrentAddress(data.currentAddress['currentAddressTC08-Points']);
		await fillAndSubmitPage.fillPermanentAddress(data.permanentAddress['permanentAddressTC08-SpecialCharacters']);
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
		await expect(fillAndSubmitPage.redBorderEmailField()).toBeVisible();
	});
	test('TC09: Should NOT submit the form when the Email field contains additional special characters beyond @ and . the point', async () => {
		await fillAndSubmitPage.fillEmail(data.invalidEmails['additionalSpecialCharacters']);
		await fillAndSubmitPage.fillName(data.name['nameTC09-lowercase']);
		await fillAndSubmitPage.fillCurrentAddress(data.currentAddress['currentAddressTC09-SpecialCharacters']);
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
		await expect(fillAndSubmitPage.redBorderEmailField()).toBeVisible();
	});
});
