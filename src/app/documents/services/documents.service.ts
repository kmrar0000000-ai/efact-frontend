import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPdf(ticket: string): Observable<Blob> {
    const url = `${this.baseUrl}/v1/pdf/${ticket}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getXml(ticket: string): Observable<string> {
    const url = `${this.baseUrl}/v1/xml/${ticket}`;
    return this.http.get(url, { responseType: 'text' });
  }

  getCdr(ticket: string): Observable<string> {
    const url = `${this.baseUrl}/v1/cdr/${ticket}`;
    return this.http.get(url, { responseType: 'text' });
  }
  
}
