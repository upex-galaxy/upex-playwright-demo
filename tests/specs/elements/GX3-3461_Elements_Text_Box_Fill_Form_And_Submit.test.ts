import { test } from '@TestBase';

test.describe('TS:GX3-3334 elementsButtons', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/buttons', { waitUntil: 'domcontentloaded' });
	});