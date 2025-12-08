import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly baseUrl = environment.apiBaseUrl;
  private readonly TOKEN_KEY = 'efact_access_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    // ✅ Endpoint correcto (el mismo que usas en Postman)
    const url = `${this.baseUrl}/oauth/token`;

    // ✅ Body como x-www-form-urlencoded
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set(
        'password',
        password
      )
      .toString(); // <- IMPORTANTE

    // ✅ Cabecera Basic tal como en Postman
    const headers = new HttpHeaders({
      Authorization: 'Basic Y2xpZW50OnNlY3JldA==', // client:secret en Base64
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<TokenResponse>(url, body, { headers }).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
      }),
      map(() => void 0)
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.clear();
  }
}
