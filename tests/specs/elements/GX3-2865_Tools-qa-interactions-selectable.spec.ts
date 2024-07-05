import type { Locator } from '@playwright/test';
import{ expect, test } from '@TestBase';
import { ListPOM } from '@pages/iñakibustosPOM';

test.describe('GX3-2865 ToolsQA | Interactions | Selectable',() => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://demoqa.com/selectable', { waitUntil: 'domcontentloaded' });
		
	});

	test('GX3-2865 | TC1:Validar seleccionar elementos visualizados en List',async ({ page }) => {
		
		const activeList: Locator= page.locator('li.list-group-item.active',{ hasText:'Cras justo odio' });
		const listPOM = new ListPOM(page);
		
		await listPOM.clickLocatorList();
		await expect(activeList).toHaveClass(/active/);
		
	});

	test('GX3-2865 | TC2:Validar seleccionar elementos visualizados en Grid',async ({ page }) => {
		
		const activeListGrid: Locator= page.locator('li.list-group-item.active',{ hasText:'One' });		
		const listPOM = new ListPOM(page);
		
		await test.step('hacer click en "Grid"', async () => {
			await page.locator('a').getByText('Grid').click();
		});
		
		await listPOM.clickLocatorGrid();
		
		await expect(activeListGrid).toHaveClass(/active/);
			
	});
});
