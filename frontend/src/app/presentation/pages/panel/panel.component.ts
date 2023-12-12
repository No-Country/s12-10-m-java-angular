import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements OnInit {

  ngOnInit(): void {
    
  }

}
