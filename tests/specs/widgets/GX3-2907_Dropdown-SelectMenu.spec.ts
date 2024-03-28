import{test,Page} from '@playwright/test';
import { DropPom } from '@pages/iñakibustosGX3-2907';


test.describe('prueba para ver si se rompe algo:', async ()=>{
	test.beforeEach(async({page})=>{
		await page.goto("https://demoqa.com/select-menu");
		
	});
	
	test('ir a la page', async({page}) => {
		const openSelectValue = page.locator('div').filter({ hasText: /^Select Option$/ }).nth(1);
		const dropPom = new DropPom(page);


		await test.step('seleccionar el dropdown', async () => {
		await openSelectValue.click();
		await dropPom.clickRandomOptions();


		
	});

	

	});

	
	
});
	

