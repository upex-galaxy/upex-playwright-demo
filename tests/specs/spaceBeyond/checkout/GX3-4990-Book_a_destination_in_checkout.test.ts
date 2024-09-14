/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { beforeEach, story, expect, test, navigateTo, CompleteForm, SpaceBeyondMainPage, InvalidForm, EmptyForm } from '@pages/TestBaseBustos';
let completeForm: CompleteForm;
let invalidForm: InvalidForm;
let emptyForm: EmptyForm;

story('GX3-4990|Book a destination in checkout', () => {
	beforeEach(async ({ page }) => {
		invalidForm = new InvalidForm(page);
		completeForm = new CompleteForm(page);
		emptyForm = new EmptyForm(page);
		await navigateTo(page, 'https://demo.testim.io/checkout');
		const selectDestination = new SpaceBeyondMainPage(page);
		await selectDestination.clickLoadMoreButton();
		await selectDestination.clickRandomBook();
	});

	test('TC1:Fill out the form correctly on the “checkout” page', async ({ page }) => {
		const validationMessage = page.getByText('successful registration');

		await completeForm.complete();
		await completeForm.agree();
		await completeForm.pay();

		await expect(validationMessage).toBeVisible();
	});
	test('TC2:Incorrectly filling out the “checkout” form with a name longer than 30 characters.', async ({ page }) => {
		const nameBox = page.getByText('Name30/');
		await invalidForm.longerName();
		await expect(nameBox).not.toHaveText('');
	});
	test('TC3:Incorrectly filling out the “checkout” form with a invalid email format', async ({ page }) => {
		const mailMessage = page.getByText('Enter a valid e-mail address');
		await completeForm.complete();
		await invalidForm.badEmail();
		await completeForm.pay();
		await expect(mailMessage).toBeVisible();
	});
	test('TC4:Incorrectly filling out the “checkout” form with a invalid Social Security Number format', async ({ page }) => {
		const ssnMessage = page.getByText('Enter a valid Social Security number');
		await completeForm.complete();
		await invalidForm.badSSN();
		await completeForm.pay();
		await expect(ssnMessage).toBeVisible();
	});
	test('TC5:Incorrectly filling out the “checkout” form with a invalid phone number', async ({ page }) => {
		const phoneMessage = page.getByText('Enter a valid US phone number');
		await completeForm.complete();
		await invalidForm.badNumberPhone();
		await completeForm.agree();
		await expect(phoneMessage).toBeVisible();
	});
	test('TC6:Incorrectly fill out the "checkout" form with an empty name', async ({ page }) => {
		const nameMessage = page.getByText('Name is a required field');
		await emptyForm.emptyNameValue();
		await completeForm.agree();
		await expect(nameMessage).toBeVisible();
	});
	test('TC7:Incorrectly fill out the "checkout" form with an empty email', async ({ page }) => {
		const emailMessage = page.getByText('Enter a valid e-mail address');
		await emptyForm.emptyEmailValue();
		await completeForm.agree();
		await expect(emailMessage).toBeVisible();
	});
	test('TC8:Incorrectly fill out the "checkout" form with an empty Social Security Number', async ({ page }) => {
		const ssnMessage = page.getByText('Enter a valid Social Security number');
		await emptyForm.emptySsnValue();
		await completeForm.agree();
		await expect(ssnMessage).toBeVisible();
	});
	test('TC9:Incorrectly fill out the "checkout" form with an empty phone number', async ({ page }) => {
		const phoneMessage = page.getByText('Enter a valid US phone number');
		await emptyForm.emptyPhoneValue();
		await completeForm.agree();
		await expect(phoneMessage).toBeVisible();
	});
});
