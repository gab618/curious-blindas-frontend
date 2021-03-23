import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../interfaces/credentials.interface';
import { Session } from '../interfaces/session.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(credentials: Credentials): Observable<Session> {
    return this.http
      .post<Session>(`${this.API_URL}/sessions`, credentials)
      .pipe(
        tap((res) => {
          this.authService.setUser(res.user);
          this.authService.setToken(res.token);
        })
      );
  }
}
