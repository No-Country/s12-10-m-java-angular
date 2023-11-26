import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-link',
  template: `
    <a [routerLink]="[path]" [ngClass]="className" class="w-full outline-none inline-block text-[.8rem] cursor-pointer font-bold text-elipsis" role="link">
      {{ textLink }}
    </a>
  `,
  styleUrls: ['./link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements OnInit {
  @Input({required: true}) path: string = "";
  @Input({required: true}) textLink: string = "";
  @Input({required: true}) className: string = "";
  

  constructor() { }

  ngOnInit() {
  }

}