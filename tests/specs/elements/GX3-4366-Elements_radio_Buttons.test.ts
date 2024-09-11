import { test, expect } from '@playwright/test';

test.describe('GX3-4308 | Elements | Buttons', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/radio-button');
	});
	test('4367 | TC1: Validar poder seleccionar elemento radio button "Yes".', async ({ page }) => {
		
		await page.getByText('Yes').click();
		await page.locator('label[for="yesRadio"]').isChecked();
		await expect(page.locator('.text-success')).toHaveText('Yes');
		
	});
	test('4367 | TC2: Validar poder seleccionar elemento radio button "Impressive"', async ({ page }) => {

		await page.getByText('Impressive').click();
		await page.locator('label[for="impressiveRadio"]').isChecked();
		await expect(page.locator('.text-success')).toHaveText('Impressive');
		
	});
	test('4367 | TC3: Validar que elemento radio button "No" esté deshabilitado.', async ({ page }) => {
	
		await page.locator('label[for="noRadio"]').isDisabled();
		
	});
});