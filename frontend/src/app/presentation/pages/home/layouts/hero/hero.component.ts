import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DefaultButtonComponent } from "../../../../components/default-button/default-button.component";
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'hero-layout',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, DefaultButtonComponent,RouterLink]
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
