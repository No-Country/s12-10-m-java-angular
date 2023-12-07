import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { BookDetail, BookFilterProps } from 'app/data/models/book';
import { SignalsStoreService } from '../store/StoreSignals.service';

@Injectable()
export class ShopService extends SignalsStoreService<BookDetail[]> {
  private api: ApiService = this.injector.get(ApiService);

  constructor(private injector: Injector) {
    super({} as BookDetail[]);
  }

  public getLeakedsBooks(filterProps: BookFilterProps) {
    return this.api.httpGet('book/searchByCriteria', true, filterProps);
  }
}
