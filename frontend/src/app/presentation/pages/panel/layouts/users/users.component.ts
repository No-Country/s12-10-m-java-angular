import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalitycComponent } from '../analityc/analityc.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AnalitycComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
