import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';

@Component({
  selector: 'admin-card',
  standalone: true,
  imports: [],
  template: ` <section class="admin-card">
    <div>
      <h3>
        {{ titleCard }}
      </h3>
    </div>
    <ng-content></ng-content>
  </section>`,
  styles: `
    .admin-card {
      border-radius: 0.9375rem;
      background: #FFFCFC;
      box-shadow: 0px 0px 12px 0px rgba(43, 0, 0, 0.10);
      padding-inline: 20px;
      padding-block: 10px;
    }
    .admin-card h3 {
      color: #313131;
      text-align: left;
      font-size: 1.5625rem;
      font-weight: 600;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCardComponent implements OnInit {
  @Input() public titleCard: string = '';

  ngOnInit(): void {}
}
