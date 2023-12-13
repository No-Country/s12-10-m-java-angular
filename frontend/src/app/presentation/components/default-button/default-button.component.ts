import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-button',
  template: `
    <button class="default-button" [type]="type" [ngClass]="className" name="default-button" [title]="title" [attr.aria-label]="title" [attr.aria-disabled] [disabled]="isDisable" [attr.aria-disabled]="isDisable">
      <ng-content></ng-content>
    </button>
  `,
  host: {
    role: 'button',
    dir: 'ltr',
  },
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultButtonComponent implements OnInit {
  @Input() public isDisable: boolean = false;
  @Input() public type: string = "button";
  @Input() public className: string = "";
  @Input() public title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
