import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/api/user';
  userResult!: User;

  async getUser(username: string): Promise<User> {
    if (!username) {
      throw new Error('Login is required.');
    }
    try {
      const response = await fetch(`${this.url}/username/${username}`);
      this.userResult = await response.json();
      return this.userResult;
    } catch (error) {
      throw error;
    }
  }

  async postUser(user: User): Promise<boolean> {
    try {
      const response = await fetch(`${this.url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Envoyer les credentials au format JSON
      });
      if (response.ok) {
        const user = await response.json();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
