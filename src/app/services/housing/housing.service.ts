import { inject, Injectable } from '@angular/core';
import { HousingLocation } from '../../models/housinglocation';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly url = 'http://localhost:8080/api/home';
  http: HttpClient = inject(HttpClient);

  /// GET All HomeLocation
  getAllHousingLocation(): Observable<HousingLocation[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<HousingLocation[]>(this.url, { headers }).pipe(
      map((res) => res),
      catchError(() => {
        // Retourne un Observable contenant un tableau vide en cas d'erreur
        return [];
      })
    );
  }

  /// GET id HomeLocation
  async getHousingLocationById(id: number): Promise<HousingLocation> {
    const idToken = localStorage.getItem('jwt');
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (response.ok) {
        return (await response.json()) ?? {};
      } else {
        return (await response.json()) ?? {};
      }
    } catch (error) {
      throw error;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
