import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalitycComponent } from '../analityc/analityc.component';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, AnalitycComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {

}
