import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
private baseUrl = 'https://localhost:5000'
  constructor(private http: HttpClient) { }

  calculate (data:any ): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/Calculator`, data);
  }

  getHistory(): Observable<any>{
    return this.http.get(`${this.baseUrl}/api/calculator/history`);
  }

  clearHistory():Observable<any> {
    return this.http.post(`${this.baseUrl}/api/clear-all`, {});
  }
}
