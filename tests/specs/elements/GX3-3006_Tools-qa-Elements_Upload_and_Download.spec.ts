import {test,expect} from '@playwright/test';
import { DownloadPage, UploadPage } from '@pages/iñakibustosGX3-3006';
import path from 'path';



test.describe('GX3-3006 | ToolsQA | Elements | Upload and Download',()=>{
	test.beforeEach(async({page})=>{
		await page.goto('https://demoqa.com/upload-download',{waitUntil:'domcontentloaded'});
	});

	test('TC1: download image', async({page})=>{
		const downloadPage = new DownloadPage(page);

		const filePath = await downloadPage.downloadFile();

		expect(filePath).toContain('.jpeg');

	});


	test('TC2: upload image', async({page}) => {

		const uploadPage = new UploadPage(page);
		await uploadPage.uploadFile();


		
	});

});
