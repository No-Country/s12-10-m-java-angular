import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  selector: 'error-message',
  template: `
    @if (showError) {
    <span class="vibrate" [ngClass]="errorClass" [class.active]="showError">
      <div class="mr-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 15V13H11V15H9ZM9 5V11H11V5H9Z"
            fill="#D93025"
          />
        </svg>
      </div>
      {{ errorMessage }}
    </span>
    }
  `,
  styles: [
    `
      span {
        display: flex;
        align-items: center;

        margin-block-start: 0.3rem;
        font-size: 0.75rem;
        line-height: 1rem;
        user-select: none;

        word-spacing: 1px;
        letter-spacing: 0.5px;
      }

      .vibrate {
        animation-name: vibrate-animation;
        animation-duration: 0.5s;
        animation-timing-function: linear;
        animation-play-state: paused;
        animation-fill-mode: both;
        transition-duration: 0.25s;
      }
      .vibrate.active {
        animation-play-state: running;
      }

      @keyframes vibrate-animation {
        0% {
          transform: translate(0);
        }
        20% {
          transform: translate(-1px, 1px);
        }
        40% {
          transform: translate(-1px, -1px);
        }
        60% {
          transform: translate(1px, 1px);
        }
        80% {
          transform: translate(1px, -1px);
        }
        100% {
          transform: translate(0);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent implements OnInit {
  @Input({ required: true }) public errorMessage: string = '';
  @Input({ required: true }) public showError: any = false;
  @Input() public errorClass: string = '';

  constructor() {}

  ngOnInit(): void {}
}
