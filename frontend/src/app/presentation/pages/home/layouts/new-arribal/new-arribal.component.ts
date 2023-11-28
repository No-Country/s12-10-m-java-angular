import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-new-arribal',
  templateUrl: './new-arribal.component.html',
  styleUrls: ['./new-arribal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewArribalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
