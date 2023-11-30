import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-link',
  template: `
    <div class="w-full flex justify-center items-center">
      <a [routerLink]="[path]" [ngClass]="className" class="outline-none inline-block text-[.9rem] min-[1449px]:text-[1rem] cursor-pointer font-bold text-elipsis" role="link">
        {{ textLink }}
      </a>
    </div>
  `,
  styleUrls: ['./link.component.css'],
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
