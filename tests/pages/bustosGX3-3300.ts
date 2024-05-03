import type { Locator, Page } from '@playwright/test';

export class HomeFunctions {
	private page: Page;
	private toggleHome: Locator;
	private expandAll: Locator;
	private collapseAll: Locator;
	private checkBoxHome: Locator;

	constructor( page:Page ) {
		this.page= page;
		this.toggleHome= page.getByRole('button',{ name:'Toggle' }).nth(0);
		this.expandAll= page.getByRole('button',{ name:'Expand all' });
		this.collapseAll= page.getByRole('button',{ name:'Collapse all' });
		this.checkBoxHome= page.locator('[class*="rct-checkbox"]').nth(0);
	}

	async clickToggleHome() {
		await this.toggleHome.click();
	}
	async clickExpandAll() {
		await this.expandAll.click();
	}
	async clickCollapseAll() {
		await this.collapseAll.click();
	}
	async selectCheckBoxHome() {
		await this.checkBoxHome.click();
	}

}

export class DesktopFunctions {
	private page:Page;
	private desktopCheck: Locator;
	private desktopToggle: Locator;
	private desktopFiles: Locator[];

	constructor( page:Page ) {
		this.page= page;
		this.desktopToggle= page.locator('ol>li').filter({ hasText: /^Desktop$/ }).getByLabel('Toggle');
		this.desktopCheck= page.locator('[class*="rct-checkbox"]').nth(1);
		
		this.desktopFiles= [page.locator('label').filter({ hasText: 'Notes' }).getByRole('img').first(),
			page.locator('label').filter({ hasText: 'Notes' }).getByRole('img').first()
		];
	}
	
	async toggleDesktop() {
		await this.desktopToggle.click();
	}
	async checkDesktop() {
		await this.desktopCheck.check();
	}
	async selectRandomDesktop() {
		await this.desktopToggle.click();
		const randomIndex = Math.floor(Math.random()*this.desktopFiles.length);
		const randomDesktopItem = this.desktopFiles[randomIndex];
		await randomDesktopItem.check();
	}

}

export class DocumentsFunctions {
	private page:Page;
	private documentsCheck: Locator;
	private documentsToggle: Locator;
	private workspaceCheck: Locator;
	private workspaceToggle: Locator;
	private workspaceItems: Locator[];
	private officeCheck: Locator;
	private officeToggle: Locator;
	private officeItems: Locator[];

	constructor(page:Page) {
		this.page= page;
		this.documentsCheck= page.locator('label').filter({ hasText: 'Documents' }).getByRole('img').first();
		this.documentsToggle= page.locator('ol>li').filter({ hasText: /^Documents$/ }).getByLabel('Toggle');
		this.workspaceCheck= page.locator('label').filter({ hasText: 'WorkSpace' }).getByRole('img').first();
		this.workspaceToggle= page.locator('ol>li').filter({ hasText: /^WorkSpace$/ }).getByLabel('Toggle');
		
		this.workspaceItems= [page.locator('label').filter({ hasText: 'React' }).getByRole('img').first(),
			page.locator('label').filter({ hasText: 'Angular' }).getByRole('img').first(), 
			page.locator('label').filter({ hasText: 'Veu' }).getByRole('img').first()];
		
		this.officeCheck= page.locator('label').filter({ hasText: 'Office' }).getByRole('img').first();
		this.officeToggle= page.locator('ol>li').filter({ hasText: /^Office$/ }).getByLabel('Toggle');
		
		this.officeItems= [ page.locator('label').filter({ hasText: 'Public' }).getByRole('img').first(),
			page.locator('label').filter({ hasText: 'Private' }).getByRole('img').first(),
			page.locator('label').filter({ hasText: 'Classified' }).getByRole('img').first(),
			page.locator('label').filter({ hasText: 'General' }).getByRole('img').first()];
	}

	async checkDocuments() {
		await this.documentsCheck.check();
	}
	async expandDocuments() {
		await this.documentsToggle.click();
	}
	async checkWorkspace() {
		await this.workspaceCheck.check();
	}
	async expandWorkspace() {
		await this.workspaceToggle.click();
	}
	
	async selectRandomWorkSpace() {
		await this.workspaceToggle.click();
		const randomIndex= Math.floor(Math.random()*this.workspaceItems.length);
		const randomWorkspaceItems= this.workspaceItems[randomIndex];
		await randomWorkspaceItems.click();
	}

	async selectRandomOffice() {
		await this.officeToggle.click();
		const randomIndex= Math.floor(Math.random()*this.officeItems.length);
		const randomOfficeItems= this.officeItems[randomIndex];
		await randomOfficeItems.click();
	}

	async checkOffice() {
		await this.officeCheck.check();
	}
	async expandOffice() {
		await this.officeToggle.click();
	}
	
}

export class DownloadsFunctions {
	private page:Page;
	private downloadsCheck: Locator;
	private downloadsToggle: Locator;
	private downloadsFiles: Locator[];

	constructor(page:Page) {
		this.page= page;
		this.downloadsCheck= page.locator('label').filter({ hasText: 'Downloads' }).getByRole('img').first();
		this.downloadsToggle= page.locator('ol>li').filter({ hasText: /^Downloads$/ }).getByLabel('Toggle');
		this.downloadsFiles= [page.locator('label').filter({ hasText: 'Word File.doc' }).getByRole('img').first(),
			page.locator('label').filter({ hasText: 'Excel File.doc' }).getByRole('img').first()
		];
	}

	async checkDownloads() {
		await this.downloadsCheck.check();
	}
	async expandDownloads() {
		await this.downloadsToggle.click();
	} 
	async selectRandomDownloads() {
		await this.downloadsToggle.click();
		const randomIndex= Math.floor(Math.random()*this.downloadsFiles.length);
		const randomDownloadsItems= this.downloadsFiles[randomIndex];
		await randomDownloadsItems.click();
	}
}