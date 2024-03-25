import{test,expect,Page} from '@playwright/test';
import {listPOM} from '../pages/iñakibustosPOM';
//import { listPOM } from './ListPOM';


test.describe('GX3-2865',()=>{
	test.beforeEach(async({page})=>{
		await page.goto('https://demoqa.com/selectable');
	});

	test('TC1 clickear un boton de la lista', async({page})=>{
		//const list = new listPOM(page);
		
		//await listPOM.locatorList;
			
		await listPOM.clickLocator();
		
			
		
		
	});






});