import { Injectable } from '@angular/core';
import { Booking } from '../../dto/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  readonly url = 'http://localhost:8080/api/booking';

  async createBooking(booking: Booking): Promise<boolean> {
    try {
      const response = await fetch(`${this.url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking), // Envoyer les credentials au format JSON
      });
      console.log(response);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
