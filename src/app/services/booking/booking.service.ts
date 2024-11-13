import { inject, Injectable } from '@angular/core';
import { Booking } from '../../models/booking';
import { BookingDTO } from '../../dto/bookingDTO';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  readonly url = 'http://localhost:8080/api/booking';
  http: HttpClient = inject(HttpClient);

  createBooking(booking: Booking): Observable<boolean> {
    const idToken = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    });
    return this.http.post(this.url, booking, { headers }).pipe(
      map(() => true),
      catchError((error) => {
        return of(false);
      })
    );
  }

  // async getBooking(bookingDTO: BookingDTO): Promise<Booking | null> {
  //   try {
  //     const idToken = localStorage.getItem('jwt');
  //     const response = await fetch(`${this.url}/user/home`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //       body: JSON.stringify(bookingDTO), // Envoyer les credentials au format JSON
  //     });
  //     if (response.ok) {
  //       return (await response.json()) ?? {};
  //     } else {
  //       if (response.status == 404) {
  //         return null;
  //       } else {
  //         throw new Error('Erreur serveur');
  //       }
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  getBooking(bookingDTO: BookingDTO): Observable<Booking | null> {
    const idToken = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    });

    return this.http
      .post<Booking>(`${this.url}/user/home`, bookingDTO, { headers })
      .pipe(
        map((response: Booking) => response ?? {}), // Retourne la réponse, ou un objet vide si `null`
        catchError((error) => {
          if (error.status === 404) {
            return of(null); // Retourne `null` si la réponse est 404
          } else {
            console.error('Server error:', error);
            return of(error);
          }
        })
      );
  }

  deleteBooking(bookingId: number): Observable<boolean> {
    const idToken = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    });

    return this.http.delete(`${this.url}/${bookingId}`, { headers }).pipe(
      map(() => true),
      catchError((err) => {
        throw err;
      })
    );
  }
}
