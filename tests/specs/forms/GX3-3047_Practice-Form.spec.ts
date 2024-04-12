import{expect, test } from '@playwright/test';
//import { faker } from '@faker-js/faker';
import { RandomFillForm, GenderOptionsForm, HobbiesOptionsForm,UploadPicture,SubjectFill,StateCitySelect,SubmitForm} from '@pages/iñakibustosGX3-3047';
let randomFillForm: RandomFillForm;
let genderOptionsForm: GenderOptionsForm;
let hobbiesOptionsForm: HobbiesOptionsForm;
let uploadPicture: UploadPicture;
let subjectFill: SubjectFill;
let stateCitySelect: StateCitySelect;
let submitForm: SubmitForm;


test.describe('GX3-3047_Practice-Form',() => {
    test.beforeEach(async ( { page } ) => {
		randomFillForm= new RandomFillForm(page);
		genderOptionsForm= new GenderOptionsForm(page);
		hobbiesOptionsForm= new HobbiesOptionsForm(page);
		uploadPicture= new UploadPicture(page);
		subjectFill= new SubjectFill(page);
		stateCitySelect= new StateCitySelect(page);
		submitForm= new SubmitForm(page);
        await page.goto('https://demoqa.com/automation-practice-form',{ waitUntil: 'domcontentloaded' });
    });
	
	test('TC1:Validar llenar el formulario',async ()=>{
		
		await test.step('Fill name,email,date,address', async () => {
			await randomFillForm.fillForm();
			expect(randomFillForm).not.toBeNull()
		});

		await test.step('select gender', async () => {			
			await genderOptionsForm.selectRandomGenderOption();
			expect(genderOptionsForm).toBeDefined();
		});

		await test.step('select hobbies', async () => {
			await hobbiesOptionsForm.selectRandomCheckboxes();
			expect (hobbiesOptionsForm).toBeDefined();
		});

		await test.step('upload a picture', async () => {
			
			await uploadPicture.uploadFile();
			expect(uploadPicture).not.toBeNaN()
		});

		await test.step('select country and city', async () => {
			await stateCitySelect.selectRandomState();
			await stateCitySelect.selectRandomCity();
			expect(stateCitySelect).not.toBeNaN();

		});

		await test.step('fill subjects', async () => {
			await subjectFill.insertRandomSubject();
			expect(subjectFill).toBeDefined();
		});

		await test.step('Submit Form', async () => {
			await submitForm.clickSubmitBtn();
		})
		
		
		
	
	
	});
});