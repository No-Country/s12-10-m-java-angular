import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  private baseUrl = 'https://librarync1.fly.dev/api/v1/api/bill';

  constructor(private http: HttpClient) {}

  saveBill(billRequest: BillRequestDto): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/save`, billRequest);
  }

  getBillList(): Observable<BillResponseDto[]> {
    return this.http.get<BillResponseDto[]>(`${this.baseUrl}/list`);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
