
import { Injectable, Injector } from '@angular/core';
import { BillRequestDto, BillResponseDto } from 'app/data/models/Bills';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  private api: ApiService = this.injector.get(ApiService);


  constructor(private injector: Injector) { 
  }

  public saveBill(billRequest: BillRequestDto): Observable<any> {
    return this.api.httpPost('bill/save', billRequest, true).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 200 && error.error instanceof Object) {
            return of(error.error);
          }
        }
        throw error;
      })
    );
  }

  getBills(): Observable<BillResponseDto[]> {
    return this.api.httpGet('bill/list', true);
 }
 
 // deleteBill(id: number): Observable<void> {
  //return this.api.httpGet('bill/list', true);
    //return this.http.delete<void>(`${this.Url}/bill/delete/${id}`);
 // }
}
