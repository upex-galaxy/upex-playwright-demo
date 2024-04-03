import{expect, test} from '@playwright/test';
import { DropPom } from '@pages/iñakibustosGX3-2907';


test.describe('GX3-2907 |ToolsQA | Widgets | Dropdown - Select Menu',() => {
    test.beforeEach(async ( { page } ) => {
        await page.goto('https://demoqa.com/select-menu',{ waitUntil: 'domcontentloaded' });
    });
	
	
	test('GX3-2907 | TC1: Validar seleccionar una opción en el dropdown "Select Value"', async({page}) => {
		
		const openSelectValue = page.locator('#withOptGroup')
		const dropPom = new DropPom(page);
		
		
		test.step('hacer click en el dropdown', async () => {
			await openSelectValue.click();
		});
		
		await test.step('elegir la opcion random', async () => {
			await dropPom.clickRandomSelectValue();
		});

		expect (openSelectValue).not.toHaveText('Select Option');
		
	});
	
	test('GX3-2907 | TC2: Validar seleccionar una opción en el dropdown "Select One"',async({page})=>{
		
		const openSelectOne= page.locator('#selectOne') 
		const dropPom = new DropPom(page);

		await test.step('hacer click en el dropdown', async () => {
			await openSelectOne.click();
		})
		
		await test.step('await dropPom.clickRandomSelectOne();', async () => {
			await dropPom.clickRandomSelectOne();
		})
		
		expect (openSelectOne).not.toHaveText('Select One');
		

	});

	test('GX3-2907 | TC3: Validar seleccionar una opción en el dropdown "Old Style Select Menu"',async({page})=>{
		const dropPom = new DropPom(page);
		const dropLocator = page.locator('#oldSelectMenu')

		await test.step('Seleccionar una opcion del dropdown', async () => {
			await dropPom.clickRandomOldSelect();
		})
		
		expect (dropLocator).toHaveValue('5');


	});



	test('GX3-2907 | TC4: Validar seleccionar todas las opciónes en el dropdown "Multiselect drop down"',async({page})=>{
		const openMultiSelectDrop= page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2);
		const dropPom = new DropPom(page);

		await test.step('Hacer click en el dropdown', async () => {
			await openMultiSelectDrop.click();
		});
		
		await test.step('Seleccionar todas las opciones', async () => {
			await dropPom.clickMultiSelectDrop();
		});
		
		expect (page.getByText('No options',{ exact: true })).toBeVisible();



	});

	test('GX3-2907 | TC5: Validar seleccionar una opción en el dropdown "Standard multi select"',async({page})=>{
		const dropPom = new DropPom(page);
		const locatorCars= page.locator('#cars');

		await test.step('Elegir una opcion', async () => {
			await dropPom.clickRandomStdMultiSelect();
		})
		
		expect(locatorCars).toBeEnabled();
	});
	
	

	
	
});
	

