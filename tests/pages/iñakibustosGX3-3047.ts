import { Page,Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import path from 'path';
import data from '@data/iñakibustosUserDetail.json' assert { type: 'json' };

type CountryData = {
  Countries: string[];
  [key: string]: string[];
};

export class RandomFillForm {
	private page:Page;
	private firstName: Locator;
	private lastName: Locator;
	private email: Locator;
	private mobileNumber: Locator;
	private currentAddress: Locator;
	private dateOfBirth:Locator;

	constructor ( page ){
		this.page = page;
		this.firstName= page.locator('#firstName');
		this.lastName= page.locator('#lastName');
		this.email= page.locator('#userEmail');
		this.mobileNumber= page.locator('#userNumber');
		this.currentAddress= page.locator('#currentAddress');
		this.dateOfBirth= page.locator('#dateOfBirthInput');
	}
	
	
	async fillForm(): Promise<void> {
    await this.fillFirstName();
    await this.fillLastName();
    await this.fillEmail();
    await this.fillMobileNumber();
    await this.fillCurrentAddress();
	await this.fillDateOfBirth();
	}

	private async fillFirstName(): Promise<void> {
		const firstName = faker.person.firstName();
		await this.firstName.fill(firstName);
	}

	private async fillLastName(): Promise<void> {
		const lastName = faker.person.lastName();
		await this.lastName.fill(lastName);
	}

	private async fillEmail(): Promise<void> {
		const email = faker.internet.email();
		await this.email.fill(email);
	}

	private async fillMobileNumber(): Promise<void> {
		const mobileNumber = faker.phone.number('##########');
		await this.mobileNumber.fill(mobileNumber);
	}

	private async fillCurrentAddress(): Promise<void> {
		const currentAddress = faker.location.streetAddress();
		await this.currentAddress.fill(currentAddress);
	}

	async fillDateOfBirth(): Promise<void> {
		const dateOfBirth = this.formatBirthdate(this.generateBirthdate());
		await this.dateOfBirth.fill(dateOfBirth);
	}

	private generateBirthdate(): Date {
		return faker.date.birthdate();
	}

	private formatBirthdate(dateOfBirth: Date): string {
		const month = String(dateOfBirth.getMonth() + 1).padStart(2, '0');
		const day = String(dateOfBirth.getDate()).padStart(2, '0');
		const year = String(dateOfBirth.getFullYear());
		return `${month}/${day}/${year}`;
	}
}

	

export class GenderOptionsForm{
	private page:Page;
	private genderOptions: Locator[];

	constructor(page: Page ){
		this.page = page;
		
		this.genderOptions=[
			this.page.getByText('Male', { exact: true }),
			this.page.getByText('Female', { exact: true }),
			this.page.getByText('Other', { exact: true }),
			
		];
	}
	
	public async selectRandomGenderOption(): Promise<void> {
		const randomIndex = Math.floor(Math.random() * this.genderOptions.length);
		await this.genderOptions[randomIndex].click();
	}
}



export class HobbiesOptionsForm{
	private page:Page;
	private hobbiesOptions: Locator[];

	constructor(page:Page){
		this.page=page
		this.hobbiesOptions=[
			this.page.getByText('Sports',{exact:true}),
			this.page.getByText('Reading',{exact:true}),
			this.page.getByText('Music',{exact:true})
		];
		
	}

	async selectRandomCheckboxes(numCheckboxes: number = 1): Promise<void> {
		const randomIndices = this.getRandomIndices(numCheckboxes);
		await Promise.all(randomIndices.map((index) => this.hobbiesOptions[index].check()));
	}

	private getRandomIndices(numRandomOptions: number): number[] {
		return Array.from({ length: this.hobbiesOptions.length })
		.map((_, index) => index)
		.sort(() => Math.random() - 0.5)
		.slice(0, numRandomOptions);
	}
}



export class UploadPicture{
	private page:Page;
	private uploadImage: Locator;

	constructor(page:Page){
		this.page=page;
		this.uploadImage= page.locator('label[for="uploadPicture"]');
	}
	async uploadFile(){
		const filePath = path.join('tests/data/images/upexlogo.png');
		await this.uploadImage.setInputFiles(filePath);
	}
}



export class SubjectsFill{
	private page:Page;
	private subjectContainer: Locator;

	constructor(page:Page) {
		this.page=page;
		this.subjectContainer = page.locator('.subjects-auto-complete__value-container');		
	}
	async insertRandomValues() {
    const Subjects = data['Subjects']
	const randomIndex = Math.floor(Math.random() * Subjects.length);
    const randomSubject = Subjects[randomIndex];

    await this.subjectContainer.click();
	await this.subjectContainer.fill(Subjects[0]);
    await this.page.keyboard.press('Enter');
	}
}



export class StateCitySelect{
	private page:Page;
	private selectState: Locator;
	private selectCity: Locator;
	private cityOptions: Locator;

	constructor(page:Page){
		this.page=page;
		this.selectState= page.locator('#state');
		this.selectCity= page.locator('#city');
		this.cityOptions = page.locator('#city >> div.css-1hwfws3');
	}

	async selectRandomState(): Promise<string> {
		const countries = data[1].Countries;
    	const randomIndex = Math.floor(Math.random() * countries.length);
    	const randomState = countries[randomIndex];

    	await this.selectState.click();
    	await this.page.locator(`#state >> text="${randomState}"`).click();

    return randomState;
  	}

	async selectRandomCity(): Promise<string> {
    const randomState = await this.selectRandomState();
    const cities = (data[1] as CountryData)[randomState];
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomCityIndex];

    await this.selectCity.click();
    await this.page.locator(`#city >> text="${randomCity}"`).click();

    return randomCity;
  }

		
		
}	

