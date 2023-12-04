/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'app/data/services/login/login.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [LoginService]
    }).compileComponents();
  });

  it('should create the LoginFormComponent', () => {
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();
  });

  it('should create the LoginFormComponent', () => {
    const fixture = TestBed.createComponent(LoginFormComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
