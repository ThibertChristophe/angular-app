import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users';

  async getUser(login: string, password: string): Promise<User[]> {
    if (!login || !password) {
      throw new Error('Login and password are required.');
    }
    try {
      const data = await fetch(
        `${this.url}?login=${login}&password=${password}`,
      );
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
