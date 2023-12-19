
import { Injectable, Injector } from '@angular/core';
import { BillRequestDto, BillResponseDto } from 'app/data/models/Bills';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  private Url = 'https://librarync1.fly.dev/api/v1';
  private api: ApiService = this.injector.get(ApiService);


  constructor(private injector: Injector) { 
  }

  public saveBill(billRequest: BillRequestDto): Observable<any>{
    return this.api.httpPost('bill/save', billRequest, true);
  }

  getBills(): Observable<BillResponseDto[]> {
    return this.api.httpGet('bill/list', true);
 }
 
 // deleteBill(id: number): Observable<void> {
  //return this.api.httpGet('bill/list', true);
    //return this.http.delete<void>(`${this.Url}/bill/delete/${id}`);
 // }
}
