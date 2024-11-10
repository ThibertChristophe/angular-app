import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../dto/login';
import { JWTTokenService } from './JWTToken.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url: string = 'http://localhost:8080/api/auth/login';
  router: Router = inject(Router);
  jwtService: JWTTokenService = inject(JWTTokenService);

  async login(credentials: Login): Promise<boolean> {
    if (!credentials.username || !credentials.password) {
      throw new Error('Username and password are required.');
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
        const res = await response.json();
        if (res.hasOwnProperty('token')) {
          const jwtToken = res.token;
          localStorage.setItem('jwt', jwtToken);
          this.jwtService.setToken(jwtToken);
        } else {
          return false;
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  
  isConnected(): boolean {
    const jwtLocal: string | null = localStorage.getItem('jwt') ?? null;
    if (jwtLocal) {
      this.jwtService.setToken(jwtLocal);
      if (!this.jwtService.isTokenExpired()) {
        return true;
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem('jwt');
    this.jwtService.setToken('');
    this.router.navigateByUrl('');
  }
}
