/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';

describe('ShopComponent', () => {
  let component: ShopComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopComponent],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
