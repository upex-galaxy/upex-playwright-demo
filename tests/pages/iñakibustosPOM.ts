import{Page} from '@playwright/test'
//let page : Page;
class ListPOM{
	page:Page
	
	async locatorList={
		list1:()=> page.locator('[type="Cras justo odio"]')
		
	}

	async clickLocator(){
		await this.locatorList.list1().click()
		
	}
}

export const listPOM = new ListPOM;