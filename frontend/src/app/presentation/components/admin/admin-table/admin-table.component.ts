import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'admin-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table>
      <ng-content select=".t-head"></ng-content>
      <ng-content select=".t-body"></ng-content>
    </table>
  `,
  styles: `
    table {
      width: 100%;
      padding-inline: 10px;
      padding-block: 10px;
      overflow: hidden;
      max-height: 375px;
      position: relative;
    }

    table ::ng-deep .t-head,
    table ::ng-deep .t-body {
      width: 100%;
    }

    table ::ng-deep .t-head > tr {
      width: 100%;
      color: rgb(167, 173, 190);
      text-transform: uppercase;
      font-weight: 500;
      line-height: 1.5rem;
      letter-spacing: 0.2px;
      border-bottom: 1px solid #e9edf7;
    }

    table ::ng-deep .t-head > tr th {
      padding-block: 0.25rem;
    }

    table ::ng-deep .t-body > tr {
      width: 100%;
      color: #747474;
      font-weight: 500;
      border-bottom: 1px solid #e9edf7;
      font-size: .95rem;
    }
    table ::ng-deep .t-body > tr td:last-child {
      letter-spacing: 2px;
      font-weight: bold;
      color: #000;
      cursor: pointer;
    }

    table ::ng-deep .t-body > tr:not(.empty):hover {
      background-color: #f1f1f1;
    }
    table ::ng-deep .t-body > tr td {
      padding-block: 0.75rem;
      text-align: center;
    }

    table ::ng-deep .t-body > tr:last-child {
      border-bottom: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTableComponent implements OnInit {
  ngOnInit(): void {}
}
