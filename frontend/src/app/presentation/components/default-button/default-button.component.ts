import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-button',
  template: `
    <button class="default-button" [type]="type" [ngClass]="className" name="default-button" [disabled]="isDisable" [attr.aria-disabled]="isDisable" accesskey="Enter" dir="ltr" role="button">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './default-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultButtonComponent implements OnInit {
  @Input() public isDisable: boolean = false;
  @Input() public type: string = "button";
  @Input() public className: string = "";

  constructor() { }

  ngOnInit() {
  }

}
