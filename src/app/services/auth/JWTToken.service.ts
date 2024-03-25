import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  jwtToken!: string;
  decodedToken!: { [key: string]: string };

  setToken(token: string): void {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken(): void {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwtDecode(this.jwtToken);
  }
  getExpiryTime(): string | null {
    this.decodeToken();
    return this.decodedToken['exp'] ?? null;
  }

  getUserId(): number {
    this.decodeToken();
    return Number(this.decodedToken['id']);
  }

  isTokenExpired(): boolean {
    const expiryTime: string | null = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * Number(expiryTime) - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
