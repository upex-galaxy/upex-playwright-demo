import { story, precondition, expect } from '@pages/TestBase';
import { test } from '@playwright/test';
import { HomePage } from '@pages/DestinationsHomePage';
import { DestinationsPage } from '@pages/DestinationsPage';

story('GX3-4266  SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	let homePage: HomePage;
	let destinationsPage: DestinationsPage;

	precondition(async ({ page }) => {
		homePage = new HomePage(page);
		destinationsPage = new DestinationsPage(page);
		await page.goto('https://demo.testim.io/');
	});

	test('TC1: Validar selección de destino con fecha de partida, fecha de regreso y tipo de pasajero', async ({ page }) => {
		await test.step('Selecciono la fecha de partida', async () => {
			await homePage.selectDepartureDate('26');
		});

		await test.step('Selecciono la fecha de regreso', async () => {
			await homePage.selectReturnDate('27');
		});

		await test.step('Selecciono el numero de adultos', async () => {
			await homePage.selectAdults('2');
		});

		await test.step('Selecciono el numero de niños', async () => {
			await homePage.selectChildren('2');
		});

		await test.step('Selecciono el destino', async () => {
			await homePage.clickSelectDestination();
			await expect(page).toHaveURL('https://demo.testim.io/destinations');
		});

		await test.step('Valido la sección "Your next destination"', async () => {
			await destinationsPage.validateNextDestinationVisible();
		});
	});

	test('TC2: Validar selección de destino con fecha de partida y fecha de regreso', async () => {
		await test.step('Selecciono la fecha de partida', async () => {
			await homePage.selectDepartureDate('26');
		});

		await test.step('Selecciono la fecha de regreso', async () => {
			await homePage.selectReturnDate('27');
		});
	});

	test('TC3: Validar selección de destino con cantidad y tipo de pasajeros', async () => {
		await test.step('Selecciono el número de adultos', async () => {
			await homePage.selectAdults('2');
		});

		await test.step('Selecciono el número de niños', async () => {
			await homePage.selectChildren('2');
		});

		await test.step('Selecciono el destino', async () => {
			await homePage.clickSelectDestination();
		});
	});

	test('TC4: Validar actualizar fecha de partida al seleccionar misma fecha de partida y regreso', async () => {
		await test.step('Selecciono la fecha de partida', async () => {
			await homePage.selectDepartureDate('26');
		});

		await test.step('Selecciono la fecha de regreso', async () => {
			await homePage.selectReturnDate('26');
		});
	});
});
