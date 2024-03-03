import { Injectable, inject } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:8080/api/user';
  isLoggedIn: boolean = false;
  redirectUrl: string = '/';
  router: Router = inject(Router);

  userResult!: User;
  async login(login: string, password: string): Promise<boolean> {
    if (!login || !password) {
      throw new Error('Login and password are required.');
    }
    try {
      const data = await fetch(`${this.url}/2`);
      if (data.status == 200) {
        const userData = await data.json();
        this.userResult = userData;
        return true;
      } else {
        this.isLoggedIn = false;
        return false;
      }
    } catch (error) {
      this.isLoggedIn = false;
      throw error;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
