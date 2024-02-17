import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000/users';
  isLoggedIn: boolean = false;
  redirectUrl: string = '/';

  userResult!: User;
  async login(login: string, password: string): Promise<boolean> {
    if (!login || !password) {
      throw new Error('Login and password are required.');
    }
    try {
      const data = await fetch(
        `${this.url}?login=${login}&password=${password}`,
      );
      if (data != null) {
        this.userResult = await data.json();
        this.isLoggedIn = true;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.isLoggedIn = false;
  }
}
