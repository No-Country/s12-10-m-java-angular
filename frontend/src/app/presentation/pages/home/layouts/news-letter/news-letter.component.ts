import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, DefaultButtonComponent],
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsLetterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
