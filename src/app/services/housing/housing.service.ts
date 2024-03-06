import { Injectable } from '@angular/core';
import { HousingLocation } from '../../models/housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly url = 'http://localhost:8080/api/home';

  /// GET All HomeLocation
  async getAllHousingLocation(): Promise<HousingLocation[]> {
    try {
      const response = await fetch(`${this.url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        return (await response.json()) ?? [];
      } else {
        return (await response.json()) ?? [];
      }
    } catch (error) {
      throw error;
    }
  }

  /// GET id HomeLocation
  async getHousingLocationById(id: number): Promise<HousingLocation> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
