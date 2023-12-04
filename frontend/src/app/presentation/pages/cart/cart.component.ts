import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
