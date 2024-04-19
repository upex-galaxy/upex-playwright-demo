import type { Page,Locator } from '@playwright/test';

export class SimpleDrop {
	private page: Page;
	private dragItem: Locator;
	private droppable: Locator;

	constructor( page : Page ) {
		this.page = page;
		this.dragItem = page.locator('#draggable');
		this.droppable= page.locator('#droppable').nth(0);
	}

	async dragSimple() {
		await this.dragItem.dragTo(this.droppable);
		
	}
}