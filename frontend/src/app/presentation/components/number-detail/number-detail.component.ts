import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'number-detail',
  template: `
    <figure class="number-detail flex flex-col gap-y-1">
      <strong> {{ number }}</strong>

      <figcaption>
        {{detail }}
      </figcaption>
    </figure>
  `,
  styleUrls: ['./number-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberDetailComponent implements OnInit {
  @Input({required: true}) public number: number | string = 0;
  @Input({required: true}) public detail: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
