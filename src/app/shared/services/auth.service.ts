import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  token: string;
  constructor(private router: Router) {}

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUser() {
    if (this.user) {
      return this.user;
    }

    const localUser = localStorage.getItem('user');
    if (localUser) {
      this.user = JSON.parse(localUser);
      return this.user;
    }
    return null;
  }

  setToken(token: any) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    if (this.token) {
      return this.token;
    }

    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!(this.getUser() && this.getToken());
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
