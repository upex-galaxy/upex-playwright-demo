import { test, expect } from '@playwright/test';
import { WebTablesPage } from '@pages/WebTablePage';
import data from '../../data/FormularioWebTables.json' assert { type: 'json' };

test.describe('GX3-5059 ToolsQA | Elements | Web Table (CRUD) ', () => {
	let webTablesPage: WebTablesPage;

	test.beforeEach(async ({ page }) => {
		webTablesPage = new WebTablesPage(page);
		await webTablesPage.goto();
	});

	test('TC1: Validar agregar un registro en la tabla', async () => {
		const { firstName, lastName, email, age, salary, department } = data.records[0];
		await test.step('Hacer clic en el botón Agregar', async () => {
			await webTablesPage.clickAddButton();
		});
		await test.step('Llenar el formulario con datos válidos', async () => {
			await webTablesPage.fillForm({ firstName, lastName, email, age, salary, department });
		});
		await test.step('Hacer clic en el botón Enviar', async () => {
			await webTablesPage.clickSubmitButton();
		});
		await test.step('Verificar que el nuevo registro esté presente', async () => {
			await webTablesPage.verifyNewRecord(firstName);
		});
	});

	test('TC2: Validar la acción del botón "Cancelar"', async () => {
		const { firstName, lastName, email, age, salary, department } = data.records[0];
		await test.step('Hacer clic en el botón Agregar', async () => {
			await webTablesPage.clickAddButton();
		});
		await test.step('Llenar el formulario con datos válidos', async () => {
			await webTablesPage.fillForm({ firstName, lastName, email, age, salary, department });
		});
		await test.step('Hacer clic en el botón Cancelar', async () => {
			await webTablesPage.clickCancelButton();
		});
		await test.step('Verificar que el registro no esté presente', async () => {
			await webTablesPage.verifyRecordNotPresent(firstName);
		});
	});

	test('TC3: Validar ingresar caracteres especiales en el campo "First Name"', async () => {
		const specialCharFirstName = '@John!';
		const { lastName, email, age, salary, department } = data.records[0];
		await test.step('Hacer clic en el botón Agregar', async () => {
			await webTablesPage.clickAddButton();
		});
		await test.step('Llenar el formulario con caracteres especiales en el primer nombre', async () => {
			await webTablesPage.fillForm({ firstName: specialCharFirstName, lastName, email, age, salary, department });
		});
		await test.step('Hacer clic en el botón Enviar', async () => {
			await webTablesPage.clickSubmitButton();
		});
		await test.step('Verificar que el nuevo registro con caracteres especiales esté presente', async () => {
			await webTablesPage.verifyNewRecord(specialCharFirstName);
		});
	});

	test('TC4: Validar la edición de un registro existente', async () => {
		const { firstName, lastName, email, age, salary, department } = data.records[0];
		await test.step('Hacer clic en el botón Agregar', async () => {
			await webTablesPage.clickAddButton();
		});
		await test.step('Llenar el formulario con datos válidos', async () => {
			await webTablesPage.fillForm({ firstName, lastName, email, age, salary, department });
		});
		await test.step('Hacer clic en el botón Enviar', async () => {
			await webTablesPage.clickSubmitButton();
		});
		await test.step('Verificar que el nuevo registro esté presente', async () => {
			await webTablesPage.verifyNewRecord(firstName);
		});

		await test.step('Editar el registro recién agregado en la fila 4', async () => {
			await webTablesPage.editRecord(4);
		});

		const updatedFirstName = 'UpdatedName';
		const updatedLastName = 'UpdatedLastName';
		const updatedEmail = 'updated.email@example.com';
		const updatedAge = '35';
		const updatedSalary = '55000';
		const updatedDepartment = 'HR';

		await test.step('Llenar el formulario con datos actualizados', async () => {
			await webTablesPage.fillForm({
				firstName: updatedFirstName,
				lastName: updatedLastName,
				email: updatedEmail,
				age: updatedAge,
				salary: updatedSalary,
				department: updatedDepartment
			});
		});
		await test.step('Hacer clic en el botón Enviar', async () => {
			await webTablesPage.clickSubmitButton();
		});
		await test.step('Verificar que el registro actualizado esté presente', async () => {
			await webTablesPage.verifyNewRecord(updatedFirstName);
		});
	});

	test('TC5: Validar dejar campo vacío en "First Name" con otros campos válidos del formulario', async () => {
		const { lastName, email, age, salary, department } = data.records[0];
		await test.step('Hacer clic en el botón Agregar', async () => {
			await webTablesPage.clickAddButton();
		});
		await test.step('Llenar el formulario dejando "First Name" vacío', async () => {
			await webTablesPage.fillForm({ firstName: '', lastName, email, age, salary, department });
		});
		await test.step('Hacer clic en el botón Enviar', async () => {
			await webTablesPage.clickSubmitButton();
		});
		await test.step('Verificar que el registro no esté presente', async () => {
			await webTablesPage.verifyRecordNotPresent('');
		});
	});

	test('TC6: Validar la ordenación de registros por nombre', async () => {
		await test.step('Hacer clic en el encabezado "First Name" para ordenar', async () => {
			await webTablesPage.clickFirstNameHeader();
		});

		await test.step('Obtener la lista de nombres de la primera columna después de ordenar', async () => {
			const names = await webTablesPage.getNamesFromFirstColumn();
			expect(names).not.toBeNull(); // Asegúrate de que names no es null
			expect(names.length).toBeGreaterThan(0); // Asegúrate de que hay nombres en la lista
		});

		await test.step('Verificar que los nombres están ordenados alfabéticamente', async () => {
			const names = await webTablesPage.getNamesFromFirstColumn(); // Obtén de nuevo los nombres para verificar
			expect(names).not.toBeNull(); // Verifica que names no es null
			const isSorted = await webTablesPage.verifyNamesAreSortedAlphabetically(names);
			expect(isSorted).toBe(true);
		});
	});

	test('TC7: Validar la ordenación de registros por apellido', async () => {
		await test.step('Ordenar por apellido', async () => {
			await webTablesPage.sortByColumn('lastName');
		});
		await test.step('Obtener los apellidos y verificar ordenación', async () => {
			const lastNames = await webTablesPage.getColumnValues(2);
			await webTablesPage.verifyColumnSorted(lastNames);
		});
	});

	test('TC8: Validar la ordenación de registros por salario', async () => {
		await test.step('Ordenar por salario', async () => {
			await webTablesPage.sortByColumn('salary');
		});
		await test.step('Obtener los salarios y verificar ordenación', async () => {
			const salaries = await webTablesPage.getColumnValues(5);
			await webTablesPage.verifyColumnSorted(salaries, true);
		});
	});

	test('TC9: Validar la paginación entre registros usando el botón "Siguiente"', async () => {
		const recordsToAdd = [
			{ firstName: 'New1', lastName: 'User1', email: 'new1@example.com', age: '25', salary: '30000', department: 'HR' },
			{ firstName: 'New2', lastName: 'User2', email: 'new2@example.com', age: '26', salary: '31000', department: 'IT' },
			{ firstName: 'New3', lastName: 'User3', email: 'new3@example.com', age: '27', salary: '32000', department: 'Finance' }
		];
		await test.step('Agregar múltiples registros', async () => {
			await webTablesPage.addMultipleRecords(recordsToAdd);
		});
		await test.step('Configurar el número de filas por página', async () => {
			await webTablesPage.setRowsPerPage('5');
		});
		await test.step('Obtener el número de filas en la página inicial', async () => {
			const initialRowCount = await webTablesPage.getRowCount();
			expect(initialRowCount).toBe(5);
		});
		await test.step('Hacer clic en el botón "Siguiente"', async () => {
			await webTablesPage.clickNextButton();
		});
		await test.step('Obtener el número de filas después de hacer clic en "Siguiente"', async () => {
			const rowCountAfterNext = await webTablesPage.getRowCount();
			expect(rowCountAfterNext).toBeLessThanOrEqual(5);
		});
	});

	test('TC10: Validar la paginación entre registros usando el botón "Anterior"', async () => {
		const recordsToAdd = [
			{ firstName: 'New1', lastName: 'User1', email: 'new1@example.com', age: '25', salary: '30000', department: 'HR' },
			{ firstName: 'New2', lastName: 'User2', email: 'new2@example.com', age: '26', salary: '31000', department: 'IT' },
			{ firstName: 'New3', lastName: 'User3', email: 'new3@example.com', age: '27', salary: '32000', department: 'Finance' }
		];
		await test.step('Agregar múltiples registros', async () => {
			await webTablesPage.addMultipleRecords(recordsToAdd);
		});
		await test.step('Configurar el número de filas por página', async () => {
			await webTablesPage.setRowsPerPage('5');
		});
		await test.step('Hacer clic en el botón "Siguiente"', async () => {
			await webTablesPage.clickNextButton();
		});
		await test.step('Obtener el número de filas después de hacer clic en "Siguiente"', async () => {
			const rowCountAfterNext = await webTablesPage.getRowCount();
			expect(rowCountAfterNext).toBeLessThanOrEqual(5);
		});
		await test.step('Hacer clic en el botón "Anterior"', async () => {
			await webTablesPage.clickPreviousButton();
		});
		await test.step('Obtener el número de filas después de hacer clic en "Anterior"', async () => {
			const rowCountAfterPrevious = await webTablesPage.getRowCount();
			expect(rowCountAfterPrevious).toBe(5);
		});
	});

	test('TC11: Validar la navegación a una página específica usando el campo de número de página', async () => {
		const recordsToAdd = [
			{ firstName: 'New1', lastName: 'User1', email: 'new1@example.com', age: '25', salary: '30000', department: 'HR' },
			{ firstName: 'New2', lastName: 'User2', email: 'new2@example.com', age: '26', salary: '31000', department: 'IT' },
			{ firstName: 'New3', lastName: 'User3', email: 'new3@example.com', age: '27', salary: '32000', department: 'Finance' }
		];
		await test.step('Agregar múltiples registros', async () => {
			await webTablesPage.addMultipleRecords(recordsToAdd);
		});
		await test.step('Configurar el número de filas por página', async () => {
			await webTablesPage.setRowsPerPage('5');
		});
		await test.step('Ir a una página específica', async () => {
			await webTablesPage.goToPage('2');
		});
		await test.step('Obtener el número de filas después de la navegación', async () => {
			const rowCountAfterNavigation = await webTablesPage.getRowCount();
			expect(rowCountAfterNavigation).toBeGreaterThan(0);
		});
	});
});
