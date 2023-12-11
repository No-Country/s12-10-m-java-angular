import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-dropdown-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-dropdown-nav.component.html',
  styleUrl: './mobile-dropdown-nav.component.css'
})
export class MobileDropdownNavComponent implements OnInit {
  
  showDropdown = false;

  constructor (){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showDropdownList() {
    this.showDropdown = !this.showDropdown
  }
}
