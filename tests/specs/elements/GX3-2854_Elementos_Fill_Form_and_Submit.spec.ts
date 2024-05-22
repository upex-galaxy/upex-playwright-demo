import { test, expect } from '@TestBase';
import data from '@data/iñakibustosUserDetail.json' assert { type: 'json' };

test.describe('GX3-2854 ',() => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://demoqa.com/text-box');
	});

	test('TC1 Validar completar el formulario',async ({ page }) => {
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput= page.locator('#userEmail-wrapper input');
		const currentAdInput= page.locator('#currentAddress-wrapper textarea');
		const permanentAdInput= page.locator('#permanentAddress-wrapper textarea');
		
		await test.step('deberia completarse el campo fullname', async () => {
			await usernameInput.fill(data[0].fullName);
		});

		await test.step('debería completarse el campo email', async () => {
			await emailInput.fill(data[0].email);
		});

		await test.step('deberia completarse el campo currentAddress', async () => {
			await currentAdInput.fill(data[0].currentAddress);
		});

		await test.step('deberia completarse el campo permanentAddress', async () => {
			await permanentAdInput.fill(data[0].permanentAddress);
		});

	});

	test('TC2: Validar enviar formulario', async ({ page }) => {
		const submitButton= page.locator('button',{ hasText:'Submit' });
		const outputName=page.locator('#output #name');
		const outputEmail=page.locator('#output #email');
		const outputCurrentAd=page.locator('#output #currentAddress');
		const outputPermanentAd=page.locator('#output #permanentAddress');
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput= page.locator('#userEmail-wrapper input');
		const currentAdInput= page.locator('#currentAddress-wrapper textarea');
		const permanentAdInput= page.locator('#permanentAddress-wrapper textarea');
		
		await test.step('deberia completarse el campo fullname', async () => {
			await usernameInput.fill(data[0].fullName);
		});

		await test.step('debería completarse el campo email', async () => {
			await emailInput.fill(data[0].email);
		});

		await test.step('deberia completarse el campo currentAddress', async () => {
			await currentAdInput.fill(data[0].currentAddress);
		});

		await test.step('deberia completarse el campo permanentAddress', async () => {
			await permanentAdInput.fill(data[0].permanentAddress);
		});

		await test.step('enviar formulario', async () => {
			await submitButton.click();
			
		});

		await test.step('verificar el output', async () => {
			expect(outputName).toContainText(data[0].fullName);
			expect(outputEmail).toContainText(data[0].email);
			expect(outputCurrentAd).toContainText(data[0].currentAddress);
			expect(outputPermanentAd).toContainText(data[0].permanentAddress);
		});
		
	});

});