/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CartComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
