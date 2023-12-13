import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'number-detail',
  template: `
    <figure class="number-detail flex flex-col gap-y-1">
      <strong> {{ number }}</strong>

      <figcaption>
        {{ detail }}
      </figcaption>
    </figure>
  `,
  styles: `.number-detail strong {
    font-size: 3rem;
    color: #1E1E1E;
    font-weight: 500;
}

.number-detail figcaption{
    white-space: pre-line;
    word-break: keep-all;
    line-height: 1.5rem;
    font-weight: 500;
    color: #727272;
    padding-inline-start: 3px;
}

@media only screen and (max-width: 710px) {
    figure.number-detail {
        flex-direction: row-reverse;
        justify-content: start;
        align-items: start;
        column-gap: 1rem;

    }

    .number-detail strong {
        font-size: clamp(1.5rem, 9dvw, 2.5rem);
        color: #1E1E1E;
        font-weight: 500;
        width: 100%;
        min-width: 90px;
        text-align: center;
    }

    .number-detail figcaption{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        font-size: clamp(.75rem, 4dvw, 1rem);
            align-self: center;
    }

}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberDetailComponent implements OnInit {
  @Input({ required: true }) public number: number | string = 0;
  @Input({ required: true }) public detail: string = '';

  constructor() {}

  ngOnInit(): void {}
}
