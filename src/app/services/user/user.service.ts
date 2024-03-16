import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/api/user/username';
  userResult!: User;

  async getUser(username: string): Promise<User> {
    if (!username) {
      throw new Error('Login is required.');
    }
    try {
      const response = await fetch(`${this.url}/${username}`);
      this.userResult = await response.json();
      return this.userResult;
    } catch (error) {
      throw error;
    }
  }
}
