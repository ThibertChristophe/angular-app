import { inject, Injectable } from '@angular/core';
import { HousingLocation } from '../../models/housinglocation';
import { catchError, map, Observable, of, tap } from 'rxjs';
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

  getHousingLocationById(id: number): Observable<HousingLocation | null> {
    const idToken = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    });

    return this.http
      .get<HousingLocation>(`${this.url}/${id}`, { headers })
      .pipe(
        map((success: HousingLocation) => success),
        catchError((error) => {
          return of(null);
        })
      );
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
