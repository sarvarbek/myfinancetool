/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaxBracketComponent } from './tax-bracket.component';

describe('TaxBracketComponent', () => {
  let component: TaxBracketComponent;
  let fixture: ComponentFixture<TaxBracketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxBracketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
