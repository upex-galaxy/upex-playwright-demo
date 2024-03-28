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
/*
	oldStyleSelect1:()=>Locator;
	oldStyleSelect2:()=>Locator;
	oldStyleSelect3:()=>Locator;
	oldStyleSelect4:()=>Locator;
	oldStyleSelect5:()=>Locator;
	oldStyleSelect6:()=>Locator;
	oldStyleSelect7:()=>Locator;
	oldStyleSelect8:()=>Locator;
	oldStyleSelect9:()=>Locator;
	oldStyleSelect10:()=>Locator;
	oldStyleSelect11:()=>Locator;
*/
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

//preguntar como se buscan esos locators 
/*
		this.oldStyleSelect1=
		this.oldStyleSelect2=
		this.oldStyleSelect3=
		this.oldStyleSelect4=
		this.oldStyleSelect5=
		this.oldStyleSelect6=
		this.oldStyleSelect7=
		this.oldStyleSelect8=
		this.oldStyleSelect9=
		this.oldStyleSelect10=
		this.oldStyleSelect11=
*/
		this.multiSelectDrop1= ()=> this.page.locator('#react-select-4-option-0');
		this.multiSelectDrop2= ()=> this.page.locator('#react-select-4-option-1');
		this.multiSelectDrop3= ()=> this.page.locator('#react-select-4-option-2');
		this.multiSelectDrop4= ()=> this.page.locator('#react-select-4-option-3');


		
		this.standardMultiselect1= ()=> this.page.getByText('Volvo')
		this.standardMultiselect2= ()=> this.page.getByText('Saab')
		this.standardMultiselect3= ()=> this.page.getByText('Opel')
		this.standardMultiselect4= ()=> this.page.getByText('Audi')
		
	}

	async clickRandomOptions(){
		await this.clickRandomOption(this.selectValue1, this.selectValue2,this.selectValue3,this.selectValue4,this.selectValue5,this.selectValue6);
	}
	private async clickRandomOption(...options: (() => Locator)[]) {
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomLocator = options[randomIndex]();
    await randomLocator.click();}


}