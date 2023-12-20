import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
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
