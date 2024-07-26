//import { test, expect } from '@TestBase';
import { test, expect } from '@playwright/test';

test.describe('GX3-4308 | Elements | Buttons', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/buttons');
	});

	test('4309 | TC1: Validar hacer doble click en button: "Double Click Me".', async ({ page }) => {
		await page.goto('/buttons');
		await page.locator('button#doubleClickBtn').dblclick();
		await expect(page.locator('p#doubleClickMessage')).toHaveText('You have done a double click');

	});

	test('4309 | TC2: Validar hacer click derecho en button: " Right Click".', async ({ page }) => {
		await page.goto('/buttons');
		await page.locator('button#rightClickBtn').click( { button : 'right' });
		await expect(page.locator('p#rightClickMessage')).toHaveText('You have done a right click');
	});

	test('4309 | TC3: Validar hacer click en button: "Click".', async ({ page }) => {
		await page.goto('/buttons');
		await page.getByText('Click Me', { exact: true }).click();
		await expect(page.locator('p#dynamicClickMessage')).toHaveText('You have done a dynamic click');
	});
});