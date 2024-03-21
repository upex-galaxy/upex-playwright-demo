import{test,expect,Page} from '@playwright/test';
import data from '@data/iñakibustosUserDetail.json' assert { type: 'json' };

let page:Page;

test.describe('GX3-2854 ',()=>{
	test.beforeEach(async({page})=>{
		await page.goto('https://demoqa.com/text-box');
	});

	test('TC1',async({page})=>{
		const usernameInput = page.locator('#userName-wrapper input');

		await test.step('debeia completarse el campo', async () => {
			await usernameInput.fill(data[0].fullName);
		});
		
	});



});