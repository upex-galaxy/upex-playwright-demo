import{test,Page} from '@playwright/test';


test.describe('prueba para ver si se rompe algo:', async ()=>{
	test('ir a la page', async({page}) => {
		await page.goto('https://demoqa.com/select-menu');

		await test.step('', async () => {
		await page.frameLocator('placeholder').getByRole('button', { name: 'Select Option' }).click();
	})
	});
	

	
	/*test('TC1:abrir el primer dropdown a ver que pasa', async({page})=>{
		await page. page.frameLocator('placeholder').getByRole('button', { name: 'Select Option' }).click();
	})
	});*/
	
	
	

});