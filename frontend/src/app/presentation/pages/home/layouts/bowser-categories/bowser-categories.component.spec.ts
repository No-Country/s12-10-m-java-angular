/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BowserCategoriesComponent } from './bowser-categories.component';

describe('BowserCategoriesComponent', () => {
  let component: BowserCategoriesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BowserCategoriesComponent],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(BowserCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BowserCategoriesComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
