import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDropdownNavComponent } from './mobile-dropdown-nav.component';

describe('MobileDropdownNavComponent', () => {
  let component: MobileDropdownNavComponent;
  let fixture: ComponentFixture<MobileDropdownNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileDropdownNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileDropdownNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
