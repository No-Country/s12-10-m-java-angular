/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';


describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RegisterFormComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});