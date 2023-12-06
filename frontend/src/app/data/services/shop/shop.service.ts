import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { BookDetail } from 'app/data/models/book';
import { RxjsStoreService } from '../store/StoreRxJs.service';
import { SignalsStoreService } from '../store/StoreSignals.service';

@Injectable()
export class ShopService extends SignalsStoreService<BookDetail[]> {
  private api: ApiService = this.injector.get(ApiService);

  constructor(private injector: Injector) { 
    super({} as BookDetail[]);
  }

  public getAllBooks(): void {
    this.api.httpGet("/books", false).subscribe((books)=>{
      this.setState(books);
    });
  }
}
