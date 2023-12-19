import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  type OnInit,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'step-add',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" [class.active]="isActive">
      <div>
        <img
          src="{{ urlImg }}"
          role="img"
          itemprop="img"
          loading="lazy"
          fetchpriority="auto"
          alt="Step Icon"
        />
      </div>

      <div class="text">
        <h4>{{ stepTitle }}</h4>
        <p>{{ stepText }}</p>
      </div>

      <button
        type="button"
        role="button"
        (click)="openModel.emit(true)"
        [class.active]="isActive"
      >
        {{ button }}
      </button>
    </div>
  `,
  styles: `
    div.container {
      display: flex;
      width: 100%;
      border-radius: 0.3125rem;
          align-items: center;
    padding-inline: 1.25rem;
    padding-block: 0.75rem;

      transition-property: background, box-shadow;
      transition-duration: .3s;
      transition-timing-function: ease;
    }

    div.container.active {
      background: #FFF;
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
    }

    div.container img {
      width: 47px;
      height: 40px;
      margin-inline-end: 1.5rem;
    }

    div.container .text {
      display: flex;
      flex-direction: column;
      text-align: left;
      justify-content: flex-start;
    }

    .text h4 {
      color: #313131;
      font-size: 1.5625rem;
      font-weight: 600;
    }

    .text p {
      color: #7C7C7C;
      font-size: 0.9375rem;
      font-weight: 500;
    }

    button {
      display: none;
    }

    button.active {
      display: block;
      justify-self: flex-end;
      border-radius: 0.9375rem;
      background: #33B672;
      padding-block: .5rem;
      padding-inline: 1rem;
      margin-inline-start: auto;
      color: #fff;
      font-weight: 500;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepAddComponent implements OnInit {
  @Input() public urlImg: string = '';
  @Input() public stepTitle: string = '';
  @Input() public stepText: string = '';
  @Input() public button: string = '';

  @Input() public isActive: boolean = false;

  @Output() public openModel: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}
}
