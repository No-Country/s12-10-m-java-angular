import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBookComponent } from './card-book.component';

describe('CardBookComponent', () => {
  let component: CardBookComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBookComponent],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(CardBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CardBookComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
