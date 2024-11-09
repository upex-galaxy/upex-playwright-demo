import { story } from '@pages/TestBase';
import test from '@playwright/test';
import { FillFormAndSubmitPage } from '@pages/text-box-fill-form-and-submit';

story('Fill form successfully', () => {
	let fillForm: FillFormAndSubmitPage;

	test.beforeEach(async ({ page }) => {
		fillForm = new FillFormAndSubmitPage(page);
		await page.goto('https://demoqa.com/text-box');
		await fillForm.clearForm();
	});

	test('Fill form successfully', async () => {
		await fillForm.fillName('Ana Ortega');
		await fillForm.fillEmail('ana.ortega@example.com');
		await fillForm.fillCurrentAddress('123 Main St, Odessa');
		await fillForm.fillPermanentAddress('456 Elm St, Odessa');
		await fillForm.submitForm();

		// expect(fillForm.fillName).toHaveText('Ana Ortega');
		// expect(fillForm.emailInput()).toHaveText('ana.ortega@example.com');
	});
});
