/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewArribalComponent } from './new-arribal.component';

describe('NewArribalComponent', () => {
  let component: NewArribalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewArribalComponent],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(NewArribalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NewArribalComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
