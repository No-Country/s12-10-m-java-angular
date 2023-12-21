import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTabComponent } from "../../../../components/admin/page-tab/page-tab.component";
import { DashCardComponent } from '@presentation/components/admin/dash-card/dash-card.component';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        PageTabComponent,
        DashCardComponent
    ]
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void { }

}
