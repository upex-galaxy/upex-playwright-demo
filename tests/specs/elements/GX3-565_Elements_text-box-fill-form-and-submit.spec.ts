import { story } from '@pages/TestBase';
import { test, expect } from '@playwright/test';
import { FillFormAndSubmitPage } from '@pages/text-box-fill-form-and-submit';
import { faker } from '@faker-js/faker';

story('GX3-565 | ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	let fillFormAndSubmit: FillFormAndSubmitPage;

	test.beforeEach(async ({ page }) => {
		fillFormAndSubmit = new FillFormAndSubmitPage(page);
		await page.goto('/text-box');
		await fillFormAndSubmit.clearForm();
	});

	test('Fill form successfully', async () => {
		const randomName = faker.person.fullName();
		const randomEmail = faker.internet.email();
		const randomCurrentAddress = faker.location.streetAddress();
		const randomPermanentAddress = faker.location.streetAddress();

		await fillFormAndSubmit.fillName(randomName);
		await fillFormAndSubmit.fillEmail(randomEmail);
		await fillFormAndSubmit.fillCurrentAddress(randomCurrentAddress);
		await fillFormAndSubmit.fillPermanentAddress(randomPermanentAddress);
		await fillFormAndSubmit.submitForm();

		expect(await fillFormAndSubmit.getOutputName()).toContain(randomName);
		expect(await fillFormAndSubmit.getOutputEmail()).toContain(randomEmail);
		expect(await fillFormAndSubmit.getOutputCurrentAddress()).toContain(randomCurrentAddress);
		expect(await fillFormAndSubmit.getOutputPermanentAddress()).toContain(randomPermanentAddress);
	});
});
