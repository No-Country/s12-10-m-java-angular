import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBooksComponent implements OnInit {

  ngOnInit(): void { }

}
