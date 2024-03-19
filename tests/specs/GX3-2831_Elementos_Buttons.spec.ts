import {test,expect,Page,} from '@playwright/test';
let page:Page;


test.describe('GX3-2831',()=>{
	
	test('TC1:Validar hacer doble click en el boton',async({page})=>{
		await test.step('GX3-2831| TC1: Validar mostrar mensaje en pantalla cuando hago click en el botón "Double Click Me"',async()=>{
			await page.goto('https://demoqa.com/buttons');
		});

		await test.step('Deberia visualizarse el mensaje "You have done a double click"',async()=>{
			await page.getByText("Double Click Me").dblclick();
			//validacion
			await expect(page.getByText("You have done a double click")).toBeVisible();
	})
	});
});