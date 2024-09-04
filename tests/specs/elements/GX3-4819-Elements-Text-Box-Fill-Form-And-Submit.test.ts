import { story, precondition, test, expect } from '@TestBase';
import data from '@data/GX3-4819_Credentials_Elements_Form_CHINO.json' assert { type: 'json' };
import { getRealValues } from '@helper/testUtils';
//import type { SimpleForm } from '@type/inputTypes_GX3-4819';

story('ToolsQA | Elements | Text Box: Fill form and Submit', async () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box');
	});

	test('GX3-4820 | TC1: Validar ingresar datos en el formulario con todos los campos válidos.', async ({ page }) => {
		const fullNameImput = page.locator('#userName-wrapper input');
		const emailImput = page.locator('#userEmail-wrapper input');
		const currentAddressImput = page.locator('#currentAddress-wrapper textarea');
		const permanentAddressImput = page.locator('#permanentAddress-wrapper textarea');

		const expectedName = await test.step('Fill the Full Name', async () => {
			const name = data[0].fullName;
			await fullNameImput.fill(name);
			return name;
		});
		const expectedEmail = await test.step('Fill the Email', async () => {
			const email = data[0].email;
			await emailImput.fill(email);
			return email;
		});
		const expectedCurrentAddress = await test.step('Fill the Current Address', async () => {
			const currentAddress = data[0].currentAddress;
			await currentAddressImput.fill(currentAddress);
			return currentAddress;
		});
		const expectedPermanentAddress = await test.step('Fill the Permanent Address', async () => {
			const permanentAddress = data[0].permanentAddress;
			await permanentAddressImput.fill(permanentAddress);
			return permanentAddress;
		});

		await test.step('Submit the Form', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verify the Outputs', async () => {
			const outputText = page.locator('#output p');

			const diplayedValues = await getRealValues(outputText);
			const expectedValues = [expectedName, expectedEmail, expectedCurrentAddress, expectedPermanentAddress];
			expect(diplayedValues).toEqual(expectedValues);

			//console.log(values);
		});
	});
	test('GX3-4820 | TC2: Validar ingresar datos válidos en el formulario dejando el campo "Full Name" vacío.', async ({ page }) => {
		//const fullNameImput = page.locator('#userName-wrapper input');
		const emailImput = page.locator('#userEmail-wrapper input');
		const currentAddressImput = page.locator('#currentAddress-wrapper textarea');
		const permanentAddressImput = page.locator('#permanentAddress-wrapper textarea');

		/*const expectedName = await test.step('Fill the Full Name', async () => {
			const name = data[1].fullName;
			await fullNameImput.fill(name);
			return name;
		});*/
		const expectedEmail = await test.step('Fill the Email', async () => {
			const email = data[1].email;
			await emailImput.fill(email);
			return email;
		});
		const expectedCurrentAddress = await test.step('Fill the Current Address', async () => {
			const currentAddress = data[1].currentAddress;
			await currentAddressImput.fill(currentAddress);
			return currentAddress;
		});
		const expectedPermanentAddress = await test.step('Fill the Permanent Address', async () => {
			const permanentAddress = data[1].permanentAddress;
			await permanentAddressImput.fill(permanentAddress);
			return permanentAddress;
		});

		await test.step('Submit the Form', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verify the Outputs', async () => {
			const outputText = page.locator('#output p');

			const diplayedValues = await getRealValues(outputText);
			const expectedValues = [/*expectedName*/ expectedEmail, expectedCurrentAddress, expectedPermanentAddress];
			expect(diplayedValues).toEqual(expectedValues);
		});
	});
	test('GX3-4820 | TC3: Validar ingresar datos válidos en el formulario dejando el campo "Email" (sin "@").', async ({ page }) => {
		const fullNameImput = page.locator('#userName-wrapper input');
		const emailImput = page.locator('#userEmail-wrapper input');
		const currentAddressImput = page.locator('#currentAddress-wrapper textarea');
		const permanentAddressImput = page.locator('#permanentAddress-wrapper textarea');

		const expectedName = await test.step('Fill the Full Name', async () => {
			const name = data[2].fullName;
			await fullNameImput.fill(name);
			return name;
		});
		const expectedEmail = await test.step('Fill the Email', async () => {
			const email = data[2].email;
			await emailImput.fill(email);
			return email;
		});
		const expectedCurrentAddress = await test.step('Fill the Current Address', async () => {
			const currentAddress = data[2].currentAddress;
			await currentAddressImput.fill(currentAddress);
			return currentAddress;
		});
		const expectedPermanentAddress = await test.step('Fill the Permanent Address', async () => {
			const permanentAddress = data[2].permanentAddress;
			await permanentAddressImput.fill(permanentAddress);
			return permanentAddress;
		});

		await test.step('Submit the Form', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verify the Output Email Fail', async () => {
			const outputEmailFail = page.locator('#userEmail-wrapper input');
			expect(outputEmailFail.isVisible()).toBe(true);

			//console.log(values);
		});
	});
	test('GX3-4820 | TC4: Validar ingresar datos válidos en el formulario dejando el campo “Current Address” vacío.', async ({ page }) => {
		const fullNameImput = page.locator('#userName-wrapper input');
		const emailImput = page.locator('#userEmail-wrapper input');
		const currentAddressImput = page.locator('#currentAddress-wrapper textarea');
		const permanentAddressImput = page.locator('#permanentAddress-wrapper textarea');

		const expectedName = await test.step('Fill the Full Name', async () => {
			const name = data[3].fullName;
			await fullNameImput.fill(name);
			return name;
		});
		const expectedEmail = await test.step('Fill the Email', async () => {
			const email = data[3].email;
			await emailImput.fill(email);
			return email;
		});
		const expectedCurrentAddress = await test.step('Fill the Current Address', async () => {
			const currentAddress = data[3].currentAddress;
			await currentAddressImput.fill(currentAddress);
			return currentAddress;
		});
		const expectedPermanentAddress = await test.step('Fill the Permanent Address', async () => {
			const permanentAddress = data[3].permanentAddress;
			await permanentAddressImput.fill(permanentAddress);
			return permanentAddress;
		});

		await test.step('Submit the Form', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verify the Outputs', async () => {
			const outputText = page.locator('#output p');

			const diplayedValues = await getRealValues(outputText);
			const expectedValues = [expectedName, expectedEmail, expectedCurrentAddress, expectedPermanentAddress];
			expect(diplayedValues).toEqual(expectedValues);

			//console.log(values);
		});
	});
	test('GX3-4820 | TC5: Validar ingresar datos válidos en el formulario dejando el campo “Email” sin (Dominio).(Extensión) y el “Current Address” vacío.', async ({ page }) => {
		const fullNameImput = page.locator('#userName-wrapper input');
		const emailImput = page.locator('#userEmail-wrapper input');
		const currentAddressImput = page.locator('#currentAddress-wrapper textarea');
		const permanentAddressImput = page.locator('#permanentAddress-wrapper textarea');

		const expectedName = await test.step('Fill the Full Name', async () => {
			const name = data[4].fullName;
			await fullNameImput.fill(name);
			return name;
		});
		const expectedEmail = await test.step('Fill the Email', async () => {
			const email = data[4].email;
			await emailImput.fill(email);
			return email;
		});
		const expectedCurrentAddress = await test.step('Fill the Current Address', async () => {
			const currentAddress = data[4].currentAddress;
			await currentAddressImput.fill(currentAddress);
			return currentAddress;
		});
		const expectedPermanentAddress = await test.step('Fill the Permanent Address', async () => {
			const permanentAddress = data[4].permanentAddress;
			await permanentAddressImput.fill(permanentAddress);
			return permanentAddress;
		});

		await test.step('Submit the Form', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verify the Outputs', async () => {
			const outputText = page.locator('#output p');

			const diplayedValues = await getRealValues(outputText);
			const expectedValues = [expectedName, expectedEmail, expectedCurrentAddress, expectedPermanentAddress];
			expect(diplayedValues).toEqual(expectedValues);

			//console.log(values);
		});
	});
	test('GX3-4820 | TC6: Validar ingresar datos válidos en el formulario con “Permanent Address” vacío.', async ({ page }) => {
		const fullNameImput = page.locator('#userName-wrapper input');
		const emailImput = page.locator('#userEmail-wrapper input');
		const currentAddressImput = page.locator('#currentAddress-wrapper textarea');
		const permanentAddressImput = page.locator('#permanentAddress-wrapper textarea');

		const expectedName = await test.step('Fill the Full Name', async () => {
			const name = data[5].fullName;
			await fullNameImput.fill(name);
			return name;
		});
		const expectedEmail = await test.step('Fill the Email', async () => {
			const email = data[5].email;
			await emailImput.fill(email);
			return email;
		});
		const expectedCurrentAddress = await test.step('Fill the Current Address', async () => {
			const currentAddress = data[5].currentAddress;
			await currentAddressImput.fill(currentAddress);
			return currentAddress;
		});
		const expectedPermanentAddress = await test.step('Fill the Permanent Address', async () => {
			const permanentAddress = data[5].permanentAddress;
			await permanentAddressImput.fill(permanentAddress);
			return permanentAddress;
		});

		await test.step('Submit the Form', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verify the Outputs', async () => {
			const outputText = page.locator('#output p');

			const diplayedValues = await getRealValues(outputText);
			const expectedValues = [expectedName, expectedEmail, expectedCurrentAddress, expectedPermanentAddress];
			expect(diplayedValues).toEqual(expectedValues);

			//console.log(values);
		});
	});
	test('GX3-4820 | TC7: Validar ingresar datos válidos en el formulario con “Email” y “Permanent Address” vacíos.', async ({ page }) => {
		const fullNameImput = page.locator('#userName-wrapper input');
		const emailImput = page.locator('#userEmail-wrapper input');
		const currentAddressImput = page.locator('#currentAddress-wrapper textarea');
		const permanentAddressImput = page.locator('#permanentAddress-wrapper textarea');

		const expectedName = await test.step('Fill the Full Name', async () => {
			const name = data[6].fullName;
			await fullNameImput.fill(name);
			return name;
		});
		const expectedEmail = await test.step('Fill the Email', async () => {
			const email = data[6].email;
			await emailImput.fill(email);
			return email;
		});
		const expectedCurrentAddress = await test.step('Fill the Current Address', async () => {
			const currentAddress = data[6].currentAddress;
			await currentAddressImput.fill(currentAddress);
			return currentAddress;
		});
		const expectedPermanentAddress = await test.step('Fill the Permanent Address', async () => {
			const permanentAddress = data[6].permanentAddress;
			await permanentAddressImput.fill(permanentAddress);
			return permanentAddress;
		});

		await test.step('Submit the Form', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verify the Outputs', async () => {
			const outputText = page.locator('#output p');

			const diplayedValues = await getRealValues(outputText);
			const expectedValues = [expectedName, expectedEmail, expectedCurrentAddress, expectedPermanentAddress];
			expect(diplayedValues).toEqual(expectedValues);

			//console.log(values);
		});
	});
	test('GX3-4820 | TC8: Validar ingresar datos válidos en el formulario con “Current Address” y “Permanent Address” vacíos.', async ({ page }) => {
		const fullNameImput = page.locator('#userName-wrapper input');
		const emailImput = page.locator('#userEmail-wrapper input');
		const currentAddressImput = page.locator('#currentAddress-wrapper textarea');
		const permanentAddressImput = page.locator('#permanentAddress-wrapper textarea');

		const expectedName = await test.step('Fill the Full Name', async () => {
			const name = data[7].fullName;
			await fullNameImput.fill(name);
			return name;
		});
		const expectedEmail = await test.step('Fill the Email', async () => {
			const email = data[7].email;
			await emailImput.fill(email);
			return email;
		});
		const expectedCurrentAddress = await test.step('Fill the Current Address', async () => {
			const currentAddress = data[7].currentAddress;
			await currentAddressImput.fill(currentAddress);
			return currentAddress;
		});
		const expectedPermanentAddress = await test.step('Fill the Permanent Address', async () => {
			const permanentAddress = data[7].permanentAddress;
			await permanentAddressImput.fill(permanentAddress);
			return permanentAddress;
		});

		await test.step('Submit the Form', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verify the Outputs', async () => {
			const outputText = page.locator('#output p');

			const diplayedValues = await getRealValues(outputText);
			const expectedValues = [expectedName, expectedEmail, expectedCurrentAddress, expectedPermanentAddress];
			expect(diplayedValues).toEqual(expectedValues);

			//console.log(values);
		});
	});
});
