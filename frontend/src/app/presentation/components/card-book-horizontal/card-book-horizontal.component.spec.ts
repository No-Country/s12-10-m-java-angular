import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBookHorizontalComponent } from './card-book-horizontal.component';

describe('CardBookHorizontalComponent', () => {
  let component: CardBookHorizontalComponent;
  let fixture: ComponentFixture<CardBookHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBookHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardBookHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
