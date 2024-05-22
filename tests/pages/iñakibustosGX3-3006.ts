import type { Page,Locator } from '@playwright/test';
import path from 'path';

export class DownloadPage {
	private page:Page;
	private downloadBtn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.downloadBtn = page.locator('#downloadButton');
	}

	async downloadFile() {
		const downloadPromise = this.page.waitForEvent('download');
		await this.downloadBtn.click();
		const download = await downloadPromise;
		const filePath = 'D:/pw_UpexGalaxy/pw_sprint39/upex-playwright-demo/coverage/Downloads' + download.suggestedFilename();
		await download.saveAs(filePath);
		return filePath;
		
	}

}
//upload

export class UploadPage {
	private page:Page;
	private uploadBtn: Locator;

	constructor(page: Page) {
		this.page=page;
		this.uploadBtn = this.page.locator('label[for="uploadFile"]');
    
	}

	async uploadFiles() {
		const filePath = path.join('tests/data/images/upexgalaxy.gif');
		await this.uploadBtn.setInputFiles(filePath);
	}
}
