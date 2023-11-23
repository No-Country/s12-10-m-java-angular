/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    }).compileComponents();
  });


  it('should create the LoginComponent 1', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('should create the LoginComponent 2', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
