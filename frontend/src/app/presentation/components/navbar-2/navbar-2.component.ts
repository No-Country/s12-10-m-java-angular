import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MobileDropdownNavComponent } from "../mobile-dropdown-nav/mobile-dropdown-nav.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-2',
  standalone: true,
  templateUrl: './navbar-2.component.html',
  styleUrl: './navbar-2.component.css',
  imports: [CommonModule, RouterLink, MobileDropdownNavComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar2Component implements OnInit {
  protected searchTerm: string = '';
  public dropdownMenu = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  search(): void {
    if (this.searchTerm !== '') {
      const shopIsActive = this.activatedRoute.snapshot.routeConfig?.path;
      if (shopIsActive) {
        this.router.navigate([], {
          queryParams: { search: this.searchTerm },
          queryParamsHandling: 'merge',
        });
      } else {
        this.router.navigate(['/shop'], {
          queryParams: { search: this.searchTerm },
        });
      }
    }
  }

  showDropdown() {
    this.dropdownMenu = !this.dropdownMenu;
  }
}
