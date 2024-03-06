import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../dto/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url: string = 'http://localhost:8080/api/auth/login';
  isLoggedIn: boolean = false;
  router: Router = inject(Router);

  async login(credentials: Login): Promise<boolean> {
    if (!credentials.login || !credentials.password) {
      throw new Error('Login and password are required.');
    }
    try {
      const response = await fetch(`${this.url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials), // Envoyer les credentials au format JSON
      });
      if (response.ok) {
        this.isLoggedIn = true;
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
