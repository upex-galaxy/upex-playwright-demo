/* eslint-disable @typescript-eslint/no-misused-promises */
import { story, precondition, test, expect } from '@TestBase';
import data from '@data/chinoUserDetail.json' assert { type: 'json' };

story('ToolsQA | Elements | Text Box: Fill form and Submit', async () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box');
	});

	test('3912 | TC1 Validar ingresar datos en el formulario con todos los campos válidos.', async ({ page }) => {
		await page.locator('#userName').fill('CHINO');
		await page.locator('#userEmail').fill('chino@gmail.com');
		await page.locator('#currentAddress').fill('Capital');
		await page.locator('#permanentAddress').fill('Túcuman');
		await page.locator('#submit').click();

		await test.step('Output View', async () => {
			const outputView = await page.locator('#output p').allInnerTexts();
			const resultOutput = outputView.map(item => item.split(':')[1].trim());
			const expectedOutput = [data[0].fullName, data[0].email, data[0].currentAddress, data[0].permanentAddress];
			expect(resultOutput).toEqual(expectedOutput);
		});
	});

	test('3912 | TC2 Validar ingresar datos válidos en el formulario dejando el campo "Full Name" vacío.', async ({ page }) => {
		await page.locator('#userName').fill('');
		await page.locator('#userEmail').fill('chino@gmail.com');
		await page.locator('#currentAddress').fill('Capital');
		await page.locator('#permanentAddress').fill('Túcuman');
		await page.locator('#submit').click();

		await test.step('Output View', async () => {
			const outputView = await page.locator('#output p').allInnerTexts();
			const resultOutput = outputView.map(item => item.split(':')[1].trim());
			const expectedOutput = [data[1].email, data[1].currentAddress, data[1].permanentAddress];

			expect(resultOutput).toEqual(expectedOutput);
		});
	});

	test('3912 | TC3 Validar ingresar datos válidos en el formulario dejando el campo "Email" (sin "@").', async ({ page }) => {
		await page.locator('#userName').fill('CHINO');
		await page.locator('#userEmail').fill('chinogmail.com');
		await page.locator('#currentAddress').fill('Capital');
		await page.locator('#permanentAddress').fill('Túcuman');
		await page.locator('#submit').click();

		await test.step('Output View', async () => {
			const emailFail = page.locator('#userEmail');
			expect(await emailFail.isVisible()).toBe(true);
		});
	});
	test('3912 | TC4 Validar ingresar datos válidos en el formulario dejando el campo “Current Address” vacío.', async ({ page }) => {
		await page.locator('#userName').fill('CHINO');
		await page.locator('#userEmail').fill('chino@gmail.com');
		await page.locator('#currentAddress').fill('');
		await page.locator('#permanentAddress').fill('Túcuman');
		await page.locator('#submit').click();

		await test.step('Output View', async () => {
			const outputView = await page.locator('#output p').allInnerTexts();
			const resultOutput = outputView.map(item => item.split(':')[1].trim());
			const expectedOutput = [data[3].fullName, data[3].email, data[3].permanentAddress];
			expect(resultOutput).toEqual(expectedOutput);
		});
	});
	test('3912 | TC5 Validar ingresar datos válidos en el formulario dejando el campo “Email” sin (Dominio).(Extensión) y el “Current Address” vacío.', async ({ page }) => {
		await page.locator('#userName').fill('CHINO');
		await page.locator('#userEmail').fill('chino@');
		await page.locator('#currentAddress').fill('');
		await page.locator('#permanentAddress').fill('Túcuman');
		await page.locator('#submit').click();

		await test.step('Output View', async () => {
			const emailFail = page.locator('#userEmail');
			expect(await emailFail.isVisible()).toBe(true);
		});
	});
	test('3912 | TC6 Validar ingresar datos válidos en el formulario con “Permanent Address” vacío.', async ({ page }) => {
		await page.locator('#userName').fill('CHINO');
		await page.locator('#userEmail').fill('chino@gmail.com');
		await page.locator('#currentAddress').fill('Capital');
		await page.locator('#permanentAddress').fill('');
		await page.locator('#submit').click();

		await test.step('Output View', async () => {
			const outputView = await page.locator('#output p').allInnerTexts();
			const resultOutput = outputView.map(item => item.split(':')[1].trim());
			const expectedOutput = [data[5].fullName, data[5].email, data[5].currentAddress];
			expect(resultOutput).toEqual(expectedOutput);
		});
	});
	test('3912 | TC7 Validar ingresar datos válidos en el formulario con “Email” y “Permanent Address” vacíos.', async ({ page }) => {
		await page.locator('#userName').fill('CHINO');
		await page.locator('#userEmail').fill('');
		await page.locator('#currentAddress').fill('Capital');
		await page.locator('#permanentAddress').fill('');
		await page.locator('#submit').click();

		await test.step('Output View', async () => {
			const emailFail = page.locator('#userEmail');
			expect(await emailFail.isVisible()).toBe(true);
		});
	});
	test('3912 | TC8 Validar ingresar datos válidos en el formulario con “Current Address” y “Permanent Address” vacíos.', async ({ page }) => {
		await page.locator('#userName').fill('CHINO');
		await page.locator('#userEmail').fill('chino@gmail.com');
		await page.locator('#currentAddress').fill('');
		await page.locator('#permanentAddress').fill('');
		await page.locator('#submit').click();

		await test.step('Output View', async () => {
			const outputView = await page.locator('#output p').allInnerTexts();
			const resultOutput = outputView.map(item => item.split(':')[1].trim());
			const expectedOutput = [data[7].fullName, data[7].email];
			expect(resultOutput).toEqual(expectedOutput);
		});
	});
});
