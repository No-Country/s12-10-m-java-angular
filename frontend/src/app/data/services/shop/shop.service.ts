import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { BookDetail, BookFilterProps, BookPagination } from 'app/data/models/book';
import { SignalsStoreService } from '../store/StoreSignals.service';

@Injectable()
export class ShopService extends SignalsStoreService<BookPagination> {
  private api: ApiService = this.injector.get(ApiService);

  constructor(private injector: Injector) {
    super({} as BookPagination);
  }

  public getLeakedsBooks(filterProps: BookFilterProps) {
    return this.api.httpGet('book/searchByCriteria', false, filterProps);
  }
}
