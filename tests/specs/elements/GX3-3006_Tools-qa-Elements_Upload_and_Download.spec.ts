import { test,expect } from '@TestBase';
import { DownloadPage, UploadPage } from '@pages/iñakibustosGX3-3006';

let downloadPage: DownloadPage;
let uploadPage: UploadPage;

test.describe('GX3-3006 | ToolsQA | Elements | Upload and Download',() => {
	test.beforeEach(async ({ page }) => {
		downloadPage = new DownloadPage(page);
		uploadPage= new UploadPage(page);
		await page.goto('https://demoqa.com/upload-download',{ waitUntil:'domcontentloaded' });
	});

	test('TC1: Validar descargar un archivo desde demoqa', async () => {
		
		const filePath = await downloadPage.downloadFile();

		expect(filePath).toContain('.jpeg');

	});

	test('TC2: Validar cargar archivos a demoqa', async ({ page }) => {
		
		await uploadPage.uploadFiles();

		await expect(page.getByText('C:\\fakepath\\upexgalaxy.gif')).toBeVisible(); 
	
	});

});
