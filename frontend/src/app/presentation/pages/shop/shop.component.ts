import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { BOOK_DETAIL_MOOK } from 'app/data/mocks/booksArray';
import { ShopService } from 'app/data/services/shop/shop.service';
import { of } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit {
  protected readonly shopService: ShopService = inject(ShopService);
  protected readonly books = this.shopService.state.asReadonly();
  constructor() { }

  ngOnInit(): void {
    of(BOOK_DETAIL_MOOK).subscribe((data: any) => {
        this.shopService.setState(data);
    });
  }

  fillters(){

  }

}
