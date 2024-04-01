import{test,Page, expect} from '@playwright/test';
import { DropPom } from '@pages/iñakibustosGX3-2907';


test.describe('🧪GX3-2907 | TS: ⚡️ToolsQA | Widgets | Dropdown - Select Menu',()=>{
	test.beforeEach(async({page})=>{
		await page.goto("https://demoqa.com/select-menu"),{ waitUntil: 'domcontentloaded' };
				
	});
	
	test('GX3-2907 | TC1: Validar seleccionar una opción en el dropdown "Select Value"', async({page}) => {
		const openSelectValue = page.locator('div').filter({ hasText: /^Select Option$/ }).nth(1);
		const dropPom = new DropPom(page);

		await openSelectValue.click();		
		await dropPom.clickRandomSelectValue();
	});

	test('GX3-2907 | TC2: Validar seleccionar una opción en el dropdown "Select One"',async({page})=>{
		const openSelectOne= page.locator('#selectOne div').filter({ hasText: 'Select Title' }).nth(1); 
		const dropPom = new DropPom(page);

		await openSelectOne.click();
		await dropPom.clickRandomSelectOne();

	});

	test('GX3-2907 | TC3: Validar seleccionar una opción en el dropdown "Old Style Select Menu"',async({page})=>{
		const dropPom = new DropPom(page);
		await dropPom.clickRandomOldSelect();
	});

	test('GX3-2907 | TC4: Validar seleccionar todas las opciónes en el dropdown "Multiselect drop down"',async({page})=>{
		const openMultiSelectDrop= page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2);
		const dropPom = new DropPom(page);

		await openMultiSelectDrop.click();
		await dropPom.clickMultiSelectDrop();
	});

	test('GX3-2907 | TC5: Validar seleccionar una opción en el dropdown "Standard multi select"',async({page})=>{
		const dropPom = new DropPom(page);

		await dropPom.clickRandomStdMultiSelect();
	});

	

	
	
});
	

