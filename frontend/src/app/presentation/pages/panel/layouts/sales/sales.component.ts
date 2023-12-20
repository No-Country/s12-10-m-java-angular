import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalitycComponent } from '../analityc/analityc.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, AnalitycComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

}
