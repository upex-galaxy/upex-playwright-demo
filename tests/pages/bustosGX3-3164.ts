import type { Page,Locator } from '@playwright/test';

export class ChangeTab {
	private page: Page;
	private acceptTab: Locator;
	private preventTab: Locator;
	private revertTab: Locator;

	constructor( page : Page ) {
		this.page= page;
		this.acceptTab = page.getByRole('tab', { name: 'Accept' });
		this.preventTab = page.locator('#droppableExample-tab-preventPropogation');
		this.revertTab = page.locator('#droppableExample-tab-revertable');
	}
	async acceptTabPage() {
		await this.acceptTab.click();
	}
	async preventTabPage() {
		await this.preventTab.click();
	}
	async revertTabPage() {
		await this.revertTab.click();
	}
}

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

export class AcceptDrop {
	private page : Page;
	private acceptableItem: Locator;
	private notAcceptableItem: Locator;
	private droppable: Locator;

	constructor( page:Page ) {
		this.page= page;
		this.acceptableItem = page.locator('#acceptable').nth(0);
		this.notAcceptableItem = page.locator('#notAcceptable').nth(0);
		this.droppable= page.locator('#droppable').nth(1);
	}

	async acceptableDrag() {
		await this.acceptableItem.dragTo(this.droppable, {
			targetPosition:{ x:20,y:20 }
		});
	}

	async notAcceptableDrag() {
		await this.notAcceptableItem.dragTo(this.droppable);
	}

	async hoverItem() {
		await this.acceptableItem.hover();
		await this.page.mouse.down();
		await this.droppable.hover();
	}
}

export class PreventDrop {
	private page: Page;
	private dragItem: Locator;
	private outerDroppable1: Locator;
	private innerDroppNotGreedy: Locator;
	private outerDroppable2: Locator;
	private innerDroppGreedy: Locator;

	constructor( page : Page ) {
		this.page= page;
		this.dragItem= page.locator('#dragBox');
		this.outerDroppable1= page.locator('#notGreedyDropBox');
		this.outerDroppable2= page.locator('#greedyDropBox');
		this.innerDroppNotGreedy= page.locator('#notGreedyInnerDropBox');
		this.innerDroppGreedy= page.locator('#greedyDropBoxInner');
	}

	async dragIntoOuterDroppable1() {
		await this.dragItem.dragTo(this.outerDroppable1, {
			targetPosition:{ x:25, y:30 }
		});
	}

	async dragIntoInnerNotGreedy() {
		await this.dragItem.dragTo(this.innerDroppNotGreedy,{
			targetPosition: { x:60,y:40 }
		});
	}

	async dragIntoOuterDroppable2() {
		await this.dragItem.dragTo(this.outerDroppable2,{
			targetPosition:{ x:25, y:30 }
		});
	}

	async dragIntoInnerGreedy() {
		await this.dragItem.dragTo(this.innerDroppGreedy, {
			targetPosition: { x:60,y:40 } 
		});
	}

	async hoverOuterBox() {
		await this.dragItem.hover();
		await this.page.mouse.down();		
		await this.outerDroppable1.hover({ position:{ x:10,y:20 } });
		
	}

	async hoverInnerBox() {
		await this.dragItem.hover();
		await this.page.mouse.down();
		await this.innerDroppNotGreedy.hover({ position:{ x:30,y:30 } });
	}
}

export class RevertDrop {
	private page:Page;
	private revertItem:Locator;
	private notRevertItem:Locator;
	private droppableBox:Locator;

	constructor( page : Page ) {
		this.page= page;
		this.revertItem= page.locator('#revertable');
		this.notRevertItem= page.locator('#notRevertable');
		this.droppableBox= page.getByLabel('Revert Draggable').locator('#droppable');
	}

	async itemDropRevert() {
		await this.revertItem.dragTo(this.droppableBox,{
			targetPosition: { x:60,y:60 } 
		});
	}

	async itemDropNotRevert() {
		await this.notRevertItem.dragTo(this.droppableBox,{
			targetPosition: { x:60,y:60 } 
		});
	}

	async hoverRevertItem() {
		await this.revertItem.hover();
		await this.page.mouse.down();
		await this.droppableBox.hover();
	}

}