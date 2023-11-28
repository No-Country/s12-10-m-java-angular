import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
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
