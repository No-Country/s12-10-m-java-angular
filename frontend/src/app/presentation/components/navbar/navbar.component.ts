import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  protected readonly loggedInState: LoggedInService = inject(LoggedInService);
  protected token: string = '';
  protected name: string = '';

  constructor() {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    const name = sessionStorage.getItem('name');
    this.token = token !== null ? token : '';
    this.name = name !== null ? name : '';


  }
}
