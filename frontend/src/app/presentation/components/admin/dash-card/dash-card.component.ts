import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCardComponent } from '../admin-card/admin-card.component';

@Component({
  selector: 'app-dash-card',
  standalone: true,
  imports: [
    CommonModule,
    AdminCardComponent
  ],
  templateUrl: './dash-card.component.html',
  styleUrl: './dash-card.component.css'
})
export class DashCardComponent {
  @Input({required:true}) public titleCard: string = '';
  @Input({required:true}) public title: string = '';
  @Input({required:true}) public subtitle: string = '';
}
