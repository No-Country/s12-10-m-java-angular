import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-dropdown-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-dropdown-nav.component.html',
  styleUrl: './mobile-dropdown-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileDropdownNavComponent implements OnInit {
  showDropdown = false;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showDropdownList() {
    this.showDropdown = !this.showDropdown;
  }
}
