import { Page,Locator } from "@playwright/test";
import path from 'path';


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
		this.uploadBtn = page.locator('#uploadFile');
		
    
	}

	async uploadFile() {
    
	const imagePaths = [
		path.resolve(path.dirname(import.meta.url), '..', 'data', 'images', 'upexgalaxy.gif'),
		path.resolve(path.dirname(import.meta.url), '..', 'data', 'images', 'upexlogo.png')
	];

    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadBtn.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(imagePaths);
	}
	
}
