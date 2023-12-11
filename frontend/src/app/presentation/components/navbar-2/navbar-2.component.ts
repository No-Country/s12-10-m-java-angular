import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MobileDropdownNavComponent } from "../mobile-dropdown-nav/mobile-dropdown-nav.component";

@Component({
    selector: 'app-navbar-2',
    standalone: true,
    templateUrl: './navbar-2.component.html',
    styleUrl: './navbar-2.component.css',
    imports: [CommonModule, RouterLink, MobileDropdownNavComponent]
})
export class Navbar2Component implements OnInit {

  dropdownMenu = false;

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {
    
  }

  search(q:any){
    console.log(q);
    // this.router.navigate("shop/+ ${q}]")
  }

  showDropdown() {
    this.dropdownMenu = !this.dropdownMenu
  }
}
