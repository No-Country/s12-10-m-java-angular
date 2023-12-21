import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AdminBooksComponent } from './layouts/admin-books/admin-books.component';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '@presentation/components/admin/side-bar/side-bar.component';
import { NavComponent } from '@presentation/components/admin/nav/nav.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DashboardComponent,
    AdminBooksComponent,
    SideBarComponent,
    NavComponent
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements OnInit {
  ngOnInit(): void {}
}
