import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-link',
  template: `
    <div class="w-full flex justify-center items-center">
      <a [routerLink]="[path]" [attr.aria-label]="textLink" [ngClass]="className" class="outline-none inline-block text-[.9rem] min-[1449px]:text-[1rem] cursor-pointer font-bold text-elipsis">
        {{ textLink }}
      </a>
    </div>
  `,
  styles: '',
  host: {
    role: 'link',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements OnInit {
  @Input({required: true}) path: string = "";
  @Input({required: true}) textLink: string = "";
  @Input({required: true}) className: string = "";

  //
  constructor() { }

  ngOnInit() {
  }

}
