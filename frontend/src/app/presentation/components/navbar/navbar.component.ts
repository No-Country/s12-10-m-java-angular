import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
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
  public token: string = '';
  public name: string = '';

  constructor() {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.token = token && token != undefined ? token : '';

    const name = localStorage.getItem('name');
    this.name = name && name != undefined ? name : '';
  }
}
