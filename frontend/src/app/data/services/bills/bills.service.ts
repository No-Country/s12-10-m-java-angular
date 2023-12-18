import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillRequestDto, BillResponseDto } from 'app/data/models/Bills';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  private Url = 'https://librarync1.fly.dev/api/v1';

  constructor(private http: HttpClient) {}

  public saveBill(billRequest: BillRequestDto): Observable<any>{
    return this.http.post<any>(`${this.Url}/bill/save`, billRequest);
  }

  getBills(): Observable<BillResponseDto[]> {
    return this.http.get<BillResponseDto[]>(`${this.Url}/bill/list`);
  }
  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/bill/delete/${id}`);
  }
}
