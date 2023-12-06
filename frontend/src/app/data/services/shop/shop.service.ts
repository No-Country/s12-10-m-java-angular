import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { BookDetail } from 'app/data/models/book';
import { SignalsStoreService } from '../store/StoreSignals.service';

@Injectable({
  providedIn: 'root'
})
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
