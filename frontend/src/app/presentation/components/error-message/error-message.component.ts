import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  selector: 'error-message',
  template: `
      @if (showError) {
        <span class=" flex mt-1 text-xs select-none" [ngClass]="errorClass">
          <div class="mr-2">
            <img ngSrc="../../../assets/icons/error.svg" width="16" height="16" alt="Error Icon" role="img" itemprop="img">
          </div>
          {{ errorMessage }}
        </span>
      }
  `,
  styleUrls: ['./error-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent implements OnInit {
  @Input({required: true}) public errorMessage: string = "";
  @Input({required: true}) public showError: any = false;
  @Input() public errorClass: string = "";
  

  constructor() { }

  ngOnInit(): void {
  }

}
