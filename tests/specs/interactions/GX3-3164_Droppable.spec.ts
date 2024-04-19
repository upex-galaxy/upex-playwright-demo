import { SimpleDrop } from '@pages/iñakibustosGX3-3164';
import type{ Page } from '@playwright/test';
import { test, expect } from '@TestBase';

let simpleDrop: SimpleDrop;

test.describe('GX3-3164 interactions-droppable', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://demoqa.com/droppable',{ waitUntil: 'domcontentloaded' });
		simpleDrop = new SimpleDrop(page);
	});
	
	test('TC1: Move simple drop',async ({ page }) => {
		await simpleDrop.dragSimple();
		const droppable = page.locator('#droppable').nth(0);

		await expect(droppable).toHaveText('Dropped!');
	});
});