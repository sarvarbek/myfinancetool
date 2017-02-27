/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PercentDifferenceDirective } from './percent-difference.directive';

@Component({
	template: `
		<div [appPercentDifference]="1" [compare]="1"></div>
		<div [appPercentDifference]="1" [compare]="2"></div>
		<div [appPercentDifference]="10" [compare]="100"></div>
		<div [appPercentDifference]="2" [compare]="1"></div>
		<div [appPercentDifference]="100" [compare]="10"></div>
		<div [appPercentDifference]="100" [compare]="10"><div class="change"></div></div>`
})

class TestComponent { }

describe('Directive: PercentDifference', () => {
	let fixture;
	let directiveEl;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			declarations: [ PercentDifferenceDirective, TestComponent ]
		})
		.createComponent(TestComponent);

		fixture.detectChanges();

		directiveEl = fixture.debugElement.queryAll(By.directive(PercentDifferenceDirective));
	});

	it('should only create a single div element', () => {
		const rootEl = directiveEl[5];
		const el = rootEl.nativeElement.getElementsByClassName('change');

		expect(el.length).toEqual(1);
	});

	describe('When comparing equal values', () => {		
		it('should create a div element with change class', () => {
			const rootEl = directiveEl[0];
			const el = rootEl.nativeElement.getElementsByClassName('change');

			expect(el.length).toEqual(1);
		});

		it('should not have a change-up or change-down class', () => {
			const rootEl = directiveEl[0];
			const changeUpEl = rootEl.nativeElement.getElementsByClassName('change-up');
			const changeDownEl = rootEl.nativeElement.getElementsByClassName('change-down');

			expect(changeUpEl.length).toEqual(0);
			expect(changeDownEl.length).toEqual(0);
		});

		it('should not display change difference', () => {
			const rootEl = directiveEl[0];
			const el = rootEl.nativeElement.getElementsByClassName('change')[0];

			expect(el.textContent).toEqual('');
		});
	});

	describe('When comparing positive change', () => {

		it('should create a div element with change class', () => {
			const rootEl1 = directiveEl[1];
			const rootEl2 = directiveEl[2];
			const el1 = rootEl1.nativeElement.getElementsByClassName('change');
			const el2 = rootEl2.nativeElement.getElementsByClassName('change');

			expect(el1.length).toEqual(1);
			expect(el2.length).toEqual(1);
		});

		it('should have change-up class', () => {
			const rootEl1 = directiveEl[1];
			const rootEl2 = directiveEl[2];
			const changeUpEl1 = rootEl1.nativeElement.getElementsByClassName('change-up');
			const changeUpEl2 = rootEl2.nativeElement.getElementsByClassName('change-up');
			
			expect(changeUpEl1.length).toEqual(1);
			expect(changeUpEl2.length).toEqual(1);
		});

		it('should NOT have change-down class', () => {
			const rootEl1 = directiveEl[1];
			const rootEl2 = directiveEl[2];
			const changeDownEl1 = rootEl1.nativeElement.getElementsByClassName('change-down');
			const changeDownEl2 = rootEl2.nativeElement.getElementsByClassName('change-down');

			expect(changeDownEl1.length).toEqual(0);
			expect(changeDownEl2.length).toEqual(0);
		});

		it('should display change difference', () => {
			const rootEl1 = directiveEl[1];
			const rootEl2 = directiveEl[2];
			const el1 = rootEl1.nativeElement.getElementsByClassName('change')[0];
			const el2 = rootEl2.nativeElement.getElementsByClassName('change')[0];

			expect(el1.textContent).toEqual('66.67%');
			expect(el2.textContent).toEqual('163.64%');
		});
	});

	describe('When comparing negative change', () => {

		it('should create a div element with change class', () => {
			const rootEl3 = directiveEl[3];
			const rootEl4 = directiveEl[4];
			const el3 = rootEl3.nativeElement.getElementsByClassName('change');
			const el4 = rootEl4.nativeElement.getElementsByClassName('change');

			expect(el3.length).toEqual(1);
			expect(el4.length).toEqual(1);
		});

		it('should have change-down class', () => {
			const rootEl3 = directiveEl[3];
			const rootEl4 = directiveEl[4];
			const changeDownEl3 = rootEl3.nativeElement.getElementsByClassName('change-down');
			const changeDownEl4 = rootEl4.nativeElement.getElementsByClassName('change-down');

			expect(changeDownEl3.length).toEqual(1);
			expect(changeDownEl4.length).toEqual(1);
		});

		it('should NOT have change-up class', () => {
			const rootEl3 = directiveEl[3];
			const rootEl4 = directiveEl[4];
			const changeUpEl3 = rootEl3.nativeElement.getElementsByClassName('change-up');
			const changeUpEl4 = rootEl4.nativeElement.getElementsByClassName('change-up');

			expect(changeUpEl3.length).toEqual(0);
			expect(changeUpEl4.length).toEqual(0);
		});

		it('should display change difference', () => {
			const rootEl3 = directiveEl[3];
			const rootEl4 = directiveEl[4];
			const el3 = rootEl3.nativeElement.getElementsByClassName('change')[0];
			const el4 = rootEl4.nativeElement.getElementsByClassName('change')[0];

			expect(el3.textContent).toEqual('66.67%');
			expect(el4.textContent).toEqual('163.64%');
		});
	});
});
