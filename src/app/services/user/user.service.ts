import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/api/user';

  async getUser(login: string, password: string): Promise<User> {
    if (!login || !password) {
      throw new Error('Login and password are required.');
    }
    try {
      const data = await fetch(`${this.url}/2`);
      return (await data.json()) ?? {};
    } catch (error) {
      throw error;
    }
  }

  submitApplication(login: string, password: string) {
    console.log(
      `Homes application received: firstName: ${login}, lastName: ${password}`,
    );
  }
}
