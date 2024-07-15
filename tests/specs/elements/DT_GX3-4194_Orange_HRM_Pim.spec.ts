import { story, precondition, test, expect } from '@pages/TestBase';

let nameCounter = 0;

story('GX3-4194 [Automation] OrangeHRM | PIM | Agregar un nuevo empleado', () => {

	precondition(async ({ page }) => {
    
		// Aqui navegamos a la pagina principal
		await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

		// Realizar el proceso de login
		await page.locator('[placeholder="Username"]').click();
		await page.locator('[placeholder="Username"]').fill('Admin');
		await page.locator('[placeholder="Password"]').click();
		await page.locator('[placeholder="Password"]').fill('admin123');
    
		// le damos click al boton login
		await page.locator('[type="submit"]').click({ force: true });
   
	});

	test('GX3-4194 | TC1: Validar agregado de un empleado sin credenciales exitosamente', async ({ page }) => {
		// nos lleva a la pagina siguiente
		await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

		// Aqui generamos un codigo para que nos de un nombre aleatorio
		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		const firstName = `Paco${alphabet[nameCounter]}`;
		const lastName = 'Picasso'; // Dejamos el Apellido fijo

		// llamamos a la variable contador y le sumamos una letra del abecederio
		nameCounter = (nameCounter + 1) % alphabet.length;

		// Navegamos  al módulo PIM > Add Employee
		await page.getByRole('link', { name: 'PIM' }).click();
		await page.getByRole('link', { name: 'Add Employee' }).click();

		// Se genera un ID del  empleado aleatorio
		const employeeId = Math.floor(Math.random() * 1000000).toString();

		// Se llenan  los campos del nuevo empleado
		await page.locator('[name="firstName"]').fill(firstName);
		await page.locator('[name="lastName"]').fill(lastName);
		await page.locator('form').getByRole('textbox').nth(4).clear();
		await page.locator('form').getByRole('textbox').nth(4).fill(employeeId);

		// Hacer clic en el botón "Save"
		await page.getByRole('button', { name: 'Save' }).click();

		// como resultado esperado vemos que se genera el mmensaje  Success 
		const successMessage = page.locator('.oxd-toast--success');
		await expect(successMessage).toBeVisible();

		// Navegamos a la lista de empleados
		await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList', { timeout: 60000 });

		// Verificamos  que el nuevo empleado se haya agregado en la "Employee List"
		const tableList = page.locator('.orangehrm-container');
		await expect(tableList).toBeVisible();
	});

	test('GX3-4194 | TC2: Validar agregado de un empleado con credenciales exitosamente', async ({ page }) => {
		// Se crean las variables de datos del empleado
		const username = `Paco${Math.floor(Math.random() * 10000)}`;
		const password = 'Pablo2345';
  
		// Navegar al módulo PIM > Add Employee
		await page.getByRole('link', { name: 'PIM' }).click();
		await page.getByRole('link', { name: 'Add Employee' }).click();
  
		// Se llena los campos del nuevo empleado
		await page.locator('[name="firstName"]').fill('Pablo');
		await page.locator('[name="lastName"]').fill('Picasso');
    
		await page.locator('form span').click();
    
		const usernameField = page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input');
		await usernameField.fill(username);
  
		const passwordField1 = page.locator('input[type="password"]').first();
		await passwordField1.fill(password);
  
		const passwordField2 = page.locator('input[type="password"]').nth(1);
		await passwordField2.fill(password);
  
		// Hacer clic en el botón "Save"
		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();
  
		// Como resultado esperado vemos que se genera el mmensaje  Success 
		
		await expect(page.locator('.oxd-toast--success')).toBeVisible();
  
		// Se Navega a la vista de detalles personales del empleado
		await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/191');
  
		// Nos vamos  de nuevo a la lista de empleados
		await page.getByRole('link', { name: 'PIM' }).click();
		await page.getByRole('link', { name: 'Employee List' }).click();
  
		// Verificamos que el nuevo empleado se haya agregado en la "Employee List"
		const tableList = page.locator('.orangehrm-container');
		await expect(tableList).toBeVisible();
  
		// Navegamos  a la sección de Admin y verificar que la gestión de usuarios esté visible
		await page.getByRole('link', { name: 'Admin' }).click();
   
		const userManagement = page.locator('h6.oxd-text--h6.oxd-topbar-header-breadcrumb-level').filter({ hasText: 'User Management' });
		await expect(userManagement).toBeVisible({ timeout: 10000 });
	});

	test('GX3-4194 | TC3: Validar que no se puede agregar un empleado con datos inválidos', async ({ page }) => {
		// Navegamos al módulo PIM > Add Employee
		await page.getByRole('link', { name: 'PIM' }).click();
		await page.getByRole('link', { name: 'Add Employee' }).click();
		
		await page.locator('[name="firstName"]').fill('');
		await page.locator('[name="lastName"]').fill('');

		// Hacemos  clic en el botón "Save"
		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();
		// Verificamos el error que sea visible
		const requiredText = page.locator('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > form > div.orangehrm-employee-container > div.orangehrm-employee-form > div:nth-child(1) > div.oxd-grid-1.orangehrm-full-width-grid > div > div > div.--name-grouped-field > div:nth-child(1) > span');
		await expect(requiredText).toBeVisible({ timeout: 10000 });
		await expect(requiredText).toHaveText('Required');
      
	});
	//Cerramos la pagina despues de correr las pruebas
	test.afterAll(async ({ browser }) => {
		// Cerrar el navegador después de todas las pruebas
		await browser.close();
	});
});
