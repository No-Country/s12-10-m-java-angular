import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavBarFormsComponent } from '@presentation/components/nav-bar-forms/nav-bar-forms.component';

@Component({
  standalone: true,
  imports: [NavBarFormsComponent],
  selector: 'app-not-found',
  templateUrl: './404.html',
  styleUrls: ['./not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
