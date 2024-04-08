import { Page,Locator } from "@playwright/test";


//download
export class DownloadPage {
	private page:Page;
	private downloadBtn: Locator;
	

	constructor(page) {
    this.page = page;
    this.downloadBtn = page.locator('#downloadButton');
	}

	async downloadFile() {
		const downloadPromise = this.page.waitForEvent('download');
		await this.downloadBtn.click();
		const download = await downloadPromise;
		const filePath = '/path/to/save/at/' + download.suggestedFilename();
		await download.saveAs(filePath);
		return filePath;
		
	}

}
//upload

export class UploadPage{
	private page:Page;
	private uploadBtn: Locator;

	constructor(page) {
		this.page=page;
		this.uploadBtn = page.locator('input[type="file"]');
		
    
	}

	async uploadFiles() {
		this.uploadBtn.setInputFiles('D:/pw_UpexGalaxy/pw_sprint39/upex-playwright-demo/tests/data/images/upexgalaxy.gif');
		

		

	}
}
	

