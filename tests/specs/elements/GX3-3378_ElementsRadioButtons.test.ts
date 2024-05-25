import { test, expect } from '@TestBase';

test.describe('TS: ToolsQA | Elements | Radio Buttons', () => {
	test.beforeEach(async ( { page } ) => {                         
		await page.goto('/radio-button', { waitUntil: 'domcontentloaded' });
	});

	test('TC1: Validar poder seleccionar elemento radio button "Yes".', async ({ page }) => {
		const rBtYes = page.locator('#yesRadio');
		await rBtYes.click({ force: true }); // Tube que forzar porque existe otro elemento que obstruye el elemento dado
		await expect(rBtYes).toBeChecked();
	});
	
	test('TC2: Validar poder seleccionar elemento radio button "Impressive".', async ({ page }) => {
		const rBtImprv = page.locator('#impressiveRadio');
		await rBtImprv.click({ force: true }); // Tube que forzar porque existe otro elemento que obstruye el elemento dado
		await expect(rBtImprv).toBeChecked();
	});
	test('TC3: Validar que elemento radio button "No" esté deshabilitado.', async ({ page }) => {
		const rBtNoRd = page.locator('#noRadio');
		//await expect(rBtNoRd).toHaveAttribute('disabled');
		await expect(rBtNoRd).toBeDisabled();
		expect(await rBtNoRd.isDisabled()).toBe(true);
	});
});
