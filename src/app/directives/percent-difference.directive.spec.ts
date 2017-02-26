/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PercentDifferenceDirective } from './percent-difference.directive';

@Component({
	template: `<div [appPercentDifference]="1" [compare]="1.5"></div>`
})

class TestComponent { }

describe('Directive: PercentDifference', () => {
	let fixture;
	let des;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			declarations: [ PercentDifferenceDirective, TestComponent ]
		})
		.createComponent(TestComponent);

		fixture.detectChanges(); // initial binding

		// all elements with an attached HighlightDirective
		des = fixture.debugElement.queryAll(By.directive(PercentDifferenceDirective));
	});

	// color tests
	it('should have three highlighted elements', () => {
	  expect(des.length).toBe(1);
	});
  
	// it('should create an instance', () => {
	// 	let directive = new PercentDifferenceDirective();
	// 	expect(directive).toBeTruthy();
	// });
});
