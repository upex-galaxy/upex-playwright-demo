import type{ Page,Locator } from '@playwright/test';

export class ListPOM {
	page:Page;
	
	list1:()=>Locator;
	list2:()=>Locator;
	list3:()=>Locator;
	list4:()=>Locator;
	
	grid1:()=>Locator;
	grid2:()=>Locator;
	grid3:()=>Locator;
	grid4:()=>Locator;
	grid5:()=>Locator;
	grid6:()=>Locator;
	grid7:()=>Locator;
	grid8:()=>Locator;
	grid9:()=>Locator;
	
	constructor(driver:Page) {
		this.page=driver;
		this.list1= () => this.page.locator('li').getByText('Cras justo odio');
		this.list2= () => this.page.locator('li').getByText('Dapibus ac facilisis in');
		this.list3= () => this.page.locator('li').getByText('Morbi leo risus');
		this.list4= () => this.page.locator('li').getByText('Porta ac consectetur ac');
		
		this.grid1= () => this.page.locator('li').getByText('One');
		this.grid2= () => this.page.locator('li').getByText('Two');
		this.grid3= () => this.page.locator('li').getByText('Three');
		this.grid4= () => this.page.locator('li').getByText('Four');
		this.grid5= () => this.page.locator('li').getByText('Five');
		this.grid6= () => this.page.locator('li').getByText('Six');
		this.grid7= () => this.page.locator('li').getByText('Seven');
		this.grid8= () => this.page.locator('li').getByText('Eight');
		this.grid9= () => this.page.locator('li').getByText('Nine');

	}

	async clickLocatorList() {
		await this.list1().click();
		await this.list2().click();
		await this.list3().click();
		await this.list4().click();
		
	}
	async clickLocatorGrid() {
		await this.grid1().click();
		await this.grid2().click();
		await this.grid3().click();
		await this.grid4().click();
		await this.grid5().click();
		await this.grid6().click();
		await this.grid7().click();
		await this.grid8().click();
		await this.grid9().click();
	}
}
