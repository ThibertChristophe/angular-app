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
        Authorization: `Bearer ${idToken}`
      });
     return this.http.post(this.url, booking, {headers}).pipe(
      map((res) => true),
      catchError((error) => {
        return of(false);
      })
     );
     
  }

  async getBooking(bookingDTO: BookingDTO): Promise<Booking | null> {
    try {
      const idToken = localStorage.getItem('jwt');
      const response = await fetch(`${this.url}/user/home`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(bookingDTO), // Envoyer les credentials au format JSON
      });
      if (response.ok) {
        return (await response.json()) ?? {};
      } else {
        if (response.status == 404) {
          return null;
        } else {
          throw new Error('Erreur serveur');
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteBooking(bookingId: number): Promise<boolean> {
    try {
      const idToken = localStorage.getItem('jwt');
      const response = await fetch(`${this.url}/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (response.ok) {
        return true;
      } else {
        throw new Error('Erreur serveur');
      }
    } catch (error) {
      throw error;
    }
  }
}
