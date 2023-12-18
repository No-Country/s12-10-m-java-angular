import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTabComponent } from "../../../../components/admin/page-tab/page-tab.component";
import { AdminCardComponent } from "../../../../components/admin/admin-card/admin-card.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        PageTabComponent,
        AdminCardComponent
    ]
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void { }

}
