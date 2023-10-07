import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnergyDisplayService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/retrieve_data');
  }

  simulateNewData(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/retrieve_data');
  }
}
