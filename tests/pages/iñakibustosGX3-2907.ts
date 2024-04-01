import{Page,Locator} from '@playwright/test';

export class DropPom{
	page:Page;
	
	selectValue1:()=>Locator;
	selectValue2:()=>Locator;
	selectValue3:()=>Locator;
	selectValue4:()=>Locator;
	selectValue5:()=>Locator;
	selectValue6:()=>Locator;

	selectOne1:()=>Locator;
	selectOne2:()=>Locator;
	selectOne3:()=>Locator;
	selectOne4:()=>Locator;
	selectOne5:()=>Locator;
	selectOne6:()=>Locator;

	oldStyleSelect1:()=>Locator;
	

	multiSelectDrop1:()=>Locator;
	multiSelectDrop2:()=>Locator;
	multiSelectDrop3:()=>Locator;
	multiSelectDrop4:()=>Locator;

	standardMultiselect1:()=>Locator;
	standardMultiselect2:()=>Locator;
	standardMultiselect3:()=>Locator;
	standardMultiselect4:()=>Locator;



	constructor (driver:Page){
		
		this.page=driver;

		
		this.selectValue1= ()=> this.page.getByText('Group 1, option 1', { exact: true });
		this.selectValue2= ()=> this.page.getByText('Group 1, option 2', { exact: true });
		this.selectValue3= ()=> this.page.getByText('Group 2, option 1', { exact: true });
		this.selectValue4= ()=> this.page.getByText('Group 2, option 2', { exact: true });
		this.selectValue5= ()=> this.page.getByText('A root option', { exact: true });
		this.selectValue6= ()=> this.page.getByText('Another root option', { exact: true });
		
		this.selectOne1= ()=> this.page.getByText('Dr.', { exact: true });
		this.selectOne2= ()=> this.page.getByText('Mr.', { exact: true });
		this.selectOne3= ()=> this.page.getByText('Mrs.', { exact: true });
		this.selectOne4= ()=> this.page.getByText('Ms.', { exact: true });
		this.selectOne5= ()=> this.page.getByText('Prof.', { exact: true });
		this.selectOne6= ()=> this.page.getByText('Other', { exact: true });

 

		this.oldStyleSelect1= ()=> this.page.locator('#oldSelectMenu');


		this.multiSelectDrop1= ()=> this.page.locator('#react-select-4-option-0');
		this.multiSelectDrop2= ()=> this.page.locator('#react-select-4-option-1');
		this.multiSelectDrop3= ()=> this.page.locator('#react-select-4-option-2');
		this.multiSelectDrop4= ()=> this.page.locator('#react-select-4-option-3');


		
		this.standardMultiselect1= ()=> this.page.getByText('Volvo')
		this.standardMultiselect2= ()=> this.page.getByText('Saab')
		this.standardMultiselect3= ()=> this.page.getByText('Opel')
		this.standardMultiselect4= ()=> this.page.getByText('Audi')
		
	}

	async clickRandomSelectValue(){
		await this.clickRandomOption(this.selectValue1, this.selectValue2,this.selectValue3,this.selectValue4,this.selectValue5,this.selectValue6);
	}
	async clickRandomSelectOne(){
		await this.clickRandomOption(this.selectOne1, this.selectOne2, this.selectOne3, this.selectOne4, this.selectOne5, this.selectOne6);
	}
	async clickMultiSelectDrop(){
		await this.multiSelectDrop1().click();
		await this.multiSelectDrop2().click();
		await this.multiSelectDrop3().click();
		await this.multiSelectDrop4().click();
	}
	async clickRandomStdMultiSelect(){
		await this.clickRandomOption(this.standardMultiselect1, this.standardMultiselect2, this.standardMultiselect3, this.standardMultiselect4)
	}
	

	async clickRandomOldSelect(){
		await this.oldStyleSelect1().selectOption('5');
	}
	
	

	
	private async clickRandomOption(...options: (() => Locator)[]) {
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomLocator = options[randomIndex]();
    await randomLocator.click();}


}