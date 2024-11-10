import { story } from '@pages/TestBase';
import { test, expect } from '@playwright/test';
import { FillFormAndSubmitPage } from '@pages/GX3-5651_FillTextboxAndSubmitPage';
import { faker } from '@faker-js/faker';

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

		expect(await fillAndSubmitPage.getOutputName()).toContain(randomName);
		expect(await fillAndSubmitPage.getOutputEmail()).toContain(randomEmail);
		expect(await fillAndSubmitPage.getOutputCurrentAddress()).toContain(randomCurrentAddress);
		expect(await fillAndSubmitPage.getOutputPermanentAddress()).toContain(randomPermanentAddress);
	});

	test('TC02: Should submit the form with all fields empty', async () => {
		await fillAndSubmitPage.submitForm();
		await expect(fillAndSubmitPage.outputArea()).toBeHidden();
	});
});
