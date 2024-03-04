import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/api/user/login';
  userResult!: User;

  async getUser(login: string): Promise<User> {
    if (!login) {
      throw new Error('Login is required.');
    }
    try {
      const response = await fetch(`${this.url}/${login}`);
      this.userResult = await response.json();
      return this.userResult;
    } catch (error) {
      throw error;
    }
  }
}
