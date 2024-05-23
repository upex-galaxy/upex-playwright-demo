import { test, expect } from '@TestBase';
//import { faker } from '@faker-js/faker';
import { RandomFillForm, GenderOptionsForm, HobbiesOptionsForm,UploadPicture,SubjectFill,StateCitySelect,SubmitForm } from '@pages/iñakibustosGX3-3047';
let randomFillForm: RandomFillForm;
let genderOptionsForm: GenderOptionsForm;
let hobbiesOptionsForm: HobbiesOptionsForm;
let uploadPicture: UploadPicture;
let subjectFill: SubjectFill;
let stateCitySelect: StateCitySelect;
let submitForm: SubmitForm;

test.describe.fixme('GX3-3047_Practice-Form',() => {
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
	
	test('TC1:Validar llenar el formulario',async () => {
		
		await test.step('Fill name,email,date,address', async () => {
			await randomFillForm.fillForm();
			expect(randomFillForm).not.toBeNull();
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
			expect(uploadPicture).not.toBeNaN();
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
			
			await submitForm.formValidation();
			expect(submitForm.formValidation).not.toBeNull();
			
		});
			
	});

	test.skip('TC2:insertar valores null en el form',async ({ page }) => {

		await test.step('fill firstName null, lastName null,email null', async () => {
			const firstName= page.locator('#firstName');
			const lastName= page.locator('#lastName');
			const email= page.locator('#userEmail');

			await randomFillForm.nullFirstName();			
			await expect(firstName).toHaveValue('');

			await randomFillForm.nullLastName();
			await expect(lastName).toHaveValue('');

			await randomFillForm.nullEmail();
			await expect(email).toHaveValue('');			
		});

		await test.step('fill mobileNumber null, dateOfBirth null, currentAddress null', async () => {
			const mobileNumber= page.locator('#userNumber');
			const dateOfBirth= page.locator('#dateOfBirthInput');
			const address= page.locator('#currentAddress');

			await randomFillForm.nullMobileNumber();
			await expect(mobileNumber).toHaveValue('');

			await randomFillForm.nullDate();
			await expect(dateOfBirth).toHaveValue('');

			await randomFillForm.nullAddress();
			await expect(address).toHaveValue('');
		});
		
		await test.step('gender option select null', async () => {
			const genderOption1= page.getByText('Male', { exact: true });
			const genderOption2= page.getByText('Female',{ exact: true });
			const genderOption3= page.getByText('Other',{ exact: true });

			await expect(genderOption1).not.toBeChecked();
			await expect(genderOption2).not.toBeChecked();
			await expect(genderOption3).not.toBeChecked();
		});
		
		await test.step('hobbies option selector null', async () => {
			const hobbieMusic= page.getByText('Music',{ exact:true });
			const hobbieSports= page.getByText('Sports',{ exact:true });
			const hobbieRead= page.getByText('Reading',{ exact:true });

			await expect(hobbieMusic).not.toBeChecked();
			await expect(hobbieSports).not.toBeChecked();
			await expect(hobbieRead).not.toBeChecked();
		});

		await test.step('upload image null', async () => {
			const uploadImg= page.locator('label[for="uploadPicture"]');
			await expect(uploadImg).not.toContainText('.png');
		});
		
		await test.step('select State & City null', async () => {
			const state = page.locator('#state');
			const city = page.locator('#city');

			await expect(state).not.toBeFocused();
			await expect(city).toBeDisabled();
		});

		await test.step('Fill subjects null', async () => {
			const subjects = page.locator('#subjectsContainer');
			await expect(subjects).toBeEmpty();
		});
		await test.step('submit form', async () => {
			await submitForm.clickSubmitBtn();
			expect(submitForm.formValidation).not.toContain('Thanks for submitting the form');
		});
		
	});

	test('TC3:Validar email incorrecto ',async () => {
		
		await test.step('start complete form', async () => {
			await randomFillForm.fillForm();

		});
		
		await test.step('insert incorrect email format ', async () => {
			
			await randomFillForm.incorrectEmail();
			expect(randomFillForm).not.toBeNull();
		});

		await test.step('submit form', async () => {
			await genderOptionsForm.selectRandomGenderOption();
			await hobbiesOptionsForm.selectRandomCheckboxes();
			await uploadPicture.uploadFile();
			await stateCitySelect.selectRandomState();
			await stateCitySelect.selectRandomCity();
			await subjectFill.insertRandomSubject();
			await submitForm.clickSubmitBtn();
			expect(submitForm.formValidation).not.toContain('Thanks for submitting the form');

		});
		
	});

	test('TC4:Validar ingresar un valor no numerico en Mobile number',async () => {
		
		await test.step('start complete form', async () => {
			await randomFillForm.fillForm();
		});
		
		await test.step('insert incorrect mobile number', async () => {
			await randomFillForm.incorrectMobileNumber();
		});

		await test.step('submit form', async () => {
			await genderOptionsForm.selectRandomGenderOption();
			await hobbiesOptionsForm.selectRandomCheckboxes();
			await uploadPicture.uploadFile();
			await stateCitySelect.selectRandomState();
			await stateCitySelect.selectRandomCity();
			await subjectFill.insertRandomSubject();
			await submitForm.clickSubmitBtn();
			expect(submitForm.formValidation).not.toContain('Thanks for submitting the form');
		});
		
	});
});
