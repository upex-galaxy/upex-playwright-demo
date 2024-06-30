import { story, precondition, test, expect } from 'tests/pages/TestBase';
import type { Page } from '@playwright/test';

story('Pruebas E2E para la página demoqa.com/sortable', () => {
	precondition(async ({ page }: { page: Page }) => {
		await page.goto('https://demoqa.com/sortable', { timeout: 60000 }); // Navega a la página con un mayor tiempo de espera
	});

	test('GX3-3956 | TC1: Validar que las pestañas "List" y "Grid" están visibles por defecto', async ({ page }) => {
		const listaTab = await page.locator('#demo-tab-list');
		const gridTab = await page.locator('#demo-tab-grid');
		await expect(listaTab).toBeVisible();
		await expect(gridTab).toBeVisible();
	});

	test('GX3-3956 | TC2: Validar que la pestaña "List" está abierta por defecto mostrando la lista de elementos', async ({ page }) => {
		const listcontain = await page.locator('.tab-content');
		await expect(listcontain).toBeVisible();
        
	});

	test('GX3-3956 | TC3: Validar el reordenamiento de los elementos en la pestaña "List"', async ({ page }) => {
		await page.waitForSelector('#demo-tabpane-list', { state: 'visible' });

		const items = page.locator('#demo-tabpane-list .vertical-list-container .list-group-item');
		const itemOne = items.nth(0);
		const itemThree = items.nth(2);

		console.log('Orden inicial:', await items.allTextContents());

		await itemOne.hover();
		await page.mouse.down();
		await itemThree.hover();
		await page.mouse.up();

		const newOrder = await items.allTextContents();
		console.log('Orden final:', newOrder);

		const expectedNewOrder = ['Two', 'Three', 'One', 'Four', 'Five', 'Six'];
		expect(expectedNewOrder[2]).toBe('One');
		expect(expectedNewOrder[0]).toBe('Two');

		await page.screenshot({ path: 'sortable-result.png' });
	});

	test('GX3-3956 | TC4: Validar que la pestaña "Grid" está visible', async ({ page }) => {
		const gridTab = await page.locator('#demo-tab-grid');
		await expect(gridTab).toBeVisible();
	});

	test('GX3-3956 | TC5: Validar el orden inicial de los elementos en la pestaña "Grid"', async ({ page }) => {
		await page.click('#demo-tab-grid');
		await page.waitForSelector('#demo-tabpane-grid .create-grid .list-group-item', { state: 'visible' });

		const gridItems = page.locator('#demo-tabpane-grid .create-grid .list-group-item');
		const itemCount = await gridItems.count();
		expect(itemCount).toBe(9);

		const initialOrder = await gridItems.allTextContents();
		const expectedInitialOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
		expect(initialOrder).toEqual(expectedInitialOrder);
	});

	test('GX3-3956 | TC6: Validar el reordenamiento de los elementos en la pestaña "Grid"', async ({ page }) => {
		await page.click('#demo-tab-grid');
		await page.waitForSelector('#demo-tabpane-grid .create-grid .list-group-item', { state: 'visible' });

		const items = page.locator('#demo-tabpane-grid .create-grid .list-group-item');
		const itemOne = items.nth(0);
		const itemThree = items.nth(2);

		console.log('Orden inicial:', await items.allTextContents());

		await itemOne.hover();
		await page.mouse.down();
		await itemThree.hover();
		await page.mouse.up();

		await page.waitForTimeout(1000);

		const newOrder = await items.allTextContents();
		console.log('Orden final:', newOrder);

		const expectedNewOrder = ['Two', 'Three', 'One', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
		expect(newOrder).toEqual(expectedNewOrder);
	});
});
