import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'nav-bar-forms',
  templateUrl: './nav-bar-forms.component.html',
  styleUrls: ['./nav-bar-forms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarFormsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
