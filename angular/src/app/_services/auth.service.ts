import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthUserDTO } from '../model/AuthUserDTO';
import { MessageResponseDTO } from '../model/MessageResponseDTO';
import { SKIP_ERROR_NOTIFICATION } from '../_helpers/error.interceptor';

const AUTH_API = `${environment.apiUrl}/api/auth/`;

// login and register forms show their own error messages
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  context: new HttpContext().set(SKIP_ERROR_NOTIFICATION, true)
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthUserDTO> {
    return this.http.post<AuthUserDTO>(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(AUTH_API + 'register', {
      username,
      email,
      password
    }, httpOptions);
  }
}
