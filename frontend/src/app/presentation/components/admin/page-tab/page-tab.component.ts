import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';

@Component({
  selector: 'admin-page-tab',
  standalone: true,
  imports: [CommonModule],
  template: ` <span> admin/{{ route }} </span>`,
  styles: `
    span {
      color: #242221;
      text-align: center;
      font-family: Inter;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabComponent implements OnInit {
  @Input() public route: string = '';

  ngOnInit(): void {}
}
