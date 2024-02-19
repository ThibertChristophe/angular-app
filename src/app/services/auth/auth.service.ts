import { Injectable, inject } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000/users';
  isLoggedIn: boolean = false;
  redirectUrl: string = '/';
  router: Router = inject(Router);

  userResult!: User;
  async login(login: string, password: string): Promise<boolean> {
    if (!login || !password) {
      throw new Error('Login and password are required.');
    }
    try {
      const data = await fetch(
        `${this.url}?login=${login}&password=${password}`,
      );
      console.log(data);
      if (data.status == 200) {
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
    this.router.navigateByUrl('');
  }
}
