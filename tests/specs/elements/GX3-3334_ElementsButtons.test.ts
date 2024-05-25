import { test, expect } from '@playwright/test';

test.describe('TS:GX3-3334 elementsButtons', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/buttons', { waitUntil: 'domcontentloaded' });
	});

	test('TC1: Validar poder hacer doble click en button: "Double Click Me".', async ({ page }) => {
		await page.goto('/buttons');
		await page.waitForTimeout(1000);
		const clickDobleBtt = page.getByRole('button', { name: 'Double Click Me' });
		await clickDobleBtt.dblclick();
		await expect(page.locator('p')).toHaveText('You have done a double click'); // como no hardcodear cualquier tipo de texto!!!
	});
	test('TC2: Validar poder hacer click derecho en button: "Right Click Me".', async ({ page }) => {
		await page.goto('/buttons');
		await page.waitForTimeout(1000);
		const clickRightBtt = page.getByRole('button', { name: 'Right Click Me' });
		await clickRightBtt.click({ button: 'right' });
		const textRightBtt = await page.locator('#rightClickMessage').textContent();
		expect(textRightBtt).toEqual('You have done a right click');
	});
	test('TC3: Validar poder hacer click izquierdo en button: "Click Me".', async ({ page }) => {
		await page.goto('/buttons');
		await page.waitForTimeout(1000);
		const bttnClick = page.getByRole('button', { name: 'Click Me', exact: true });
		await bttnClick.click();
		const textButton = page.locator('#dynamicClickMessage');
		await expect(textButton).toHaveText('You have done a dynamic click');
	});
});