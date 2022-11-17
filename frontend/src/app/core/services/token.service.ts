import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';
import {Token} from '../../model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private currentToken: string = '';

  constructor(
    private http: HttpClient,
  ) {
  }

  getToken(): string {
    this.currentToken = globalThis.localStorage?.getItem('token') || '';
    if (this.currentToken.length === 0) {
      this.generateToken();
    }
    return this.currentToken;
  }

  async regenerateToken() {
    await this.http.get<Token>(`${environment.backendURL}/token/${this.currentToken}`).toPromise().then((data: Token) => {
      this.setToken(data.token);
    });
  }

  setToken(token: string) {
    globalThis.localStorage?.setItem('token', token);
    this.currentToken = token;
  }

  private generateToken() {
    this.http.get<Token>(`${environment.backendURL}/token`).subscribe((data: Token) => {
      this.setToken(data.token);
    });
  }
}
