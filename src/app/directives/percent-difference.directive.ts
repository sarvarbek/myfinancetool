import { Directive, ElementRef, Input, Renderer, OnChanges } from '@angular/core';

@Directive({
  selector: '[appPercentDifference]'
})

export class PercentDifferenceDirective implements OnChanges {

	@Input('appPercentDifference') currentValue : string;
	@Input() compare : string;

	constructor (private el: ElementRef, private renderer: Renderer) {}

	/**
	* Everytime the @Input is updated, we update the change %
	**/
	ngOnChanges(): void {
		if (!this.compare && !this.currentValue) return;

		this.createElement();
		this.updateNode();
	}

	private createElement() : void {
		if (this.el.nativeElement.getElementsByClassName('change')[0] !== undefined) return;

		let changeNode = document.createElement('div');
		changeNode.className = 'change';

		let iconNode = document.createElement('span');
		iconNode.setAttribute('aria-hidden', 'true');
		iconNode.className = 'fa';

		changeNode.appendChild(iconNode);

		this.el.nativeElement.insertBefore(changeNode, this.el.nativeElement.firstChild);
	}

	private updateNode() : void {
		this.changeDirection();
		this.displayPercentChange();
	}

	private displayPercentChange() : void {
		if (this.currentValue === this.compare) {
			this.renderer.setText(this.el.nativeElement.getElementsByClassName('change')[0], '');
		} else {
			this.renderer.setText(this.el.nativeElement.getElementsByClassName('change')[0], this.percentChange());
		}
	}

	private changeDirection() : void {
		let classToAdd : string = '';

		if (this.currentValue > this.compare) {
			classToAdd = 'change-down';
		} else if (this.currentValue < this.compare) {
			classToAdd = 'change-up';
		}

		// Remove both classes
		this.renderer.setElementClass(this.el.nativeElement.getElementsByClassName('change')[0], 'change-up', false);
		this.renderer.setElementClass(this.el.nativeElement.getElementsByClassName('change')[0], 'change-down', false);
		
		if (classToAdd !== '') {
			this.renderer.setElementClass(this.el.nativeElement.getElementsByClassName('change')[0], classToAdd, true);
		}
	}

	private percentChange() : string {
		let currentValue = Number(this.currentValue);
		let valueToCompare = Number(this.compare);

		return Number((currentValue - valueToCompare)/((currentValue + valueToCompare) / 2) * 100).toFixed(2) + '%';
	}
}
