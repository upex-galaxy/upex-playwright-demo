import{test,expect,Page} from '@playwright/test';
import data from '@data/iñakibustosUserDetail.json' assert { type: 'json' };

let page:Page;

test.describe('GX3-2854 ',()=>{
	test.beforeEach(async({page})=>{
		await page.goto('https://demoqa.com/text-box');
	});

	test('TC1',async({page})=>{
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput= page.locator('#userEmail-wrapper input');
		const currentAdInput= page.locator('#currentAddress-wrapper textarea');
		const permanentAdInput= page.locator('#permanentAddress-wrapper textarea');
		const submitButton= page.locator('button',{hasText:'Submit'});
		
		
		await test.step('deberia completarse el campo fullname', async () => {
			await usernameInput.fill(data[0].fullName);
		});

		await test.step('debería completarse el campo email', async () => {
			await emailInput.fill(data[0].email);
		});

		await test.step('deberia completarse el campo currentAddress', async () => {
			await currentAdInput.fill(data[0].currentAddress);
		});

		await test.step('deberia completarse el campo permanentAddress', async () => {
			await permanentAdInput.fill(data[0].permanentAddress);
		});

		await test.step('enviar formulario', async () => {
			await submitButton.click();
			
		});

		
		
		
		
		
		
	});



});