/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    component= fixture.componentInstance;
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
