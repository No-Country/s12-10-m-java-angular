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
  private readonly loggedInState: LoggedInService = inject(LoggedInService);
  protected readonly token = this.loggedInState.select('jwt');
  protected readonly name = this.loggedInState.select('name');

  constructor(protected loggeIn: LoggedInService) {}

  ngOnInit(): void {}
}
