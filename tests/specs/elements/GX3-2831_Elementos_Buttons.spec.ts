import { test,expect } from '@TestBase';

test.describe('GX3-2831 | TS: ⚡️ToolsQA | Elements | Buttons',() => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://demoqa.com/buttons');
	});
	
	test('TC1:Validar hacer doble click en el boton',async ({ page }) => {

		await test.step('Deberia visualizarse el mensaje "You have done a double click"',async () => {
			await page.getByText('Double Click Me').dblclick();
			
			await expect(page.getByText('You have done a double click')).toBeVisible();
		});
	});

	test('TC2:Validar hacer click derecho en el boton',async ({ page }) => {

		await test.step('Deberia visualizarse el mensaje "You have done a right click"',async () => {
			await page.getByText('Right Click Me').click({ button: 'right' });
			
			await expect(page.getByText('You have done a right click')).toBeVisible();
		});
	});

	test('TC3:Validar hacer click en el boton con id dinamico',async ({ page }) => {

		await test.step('Deberia visualizarse el mensaje "You have done a dynamic click"',async () => {
			await page.getByText('Click Me', { exact: true }).click();
			
			await expect(page.getByText('You have done a dynamic click')).toBeVisible();
		});
	});
	
});