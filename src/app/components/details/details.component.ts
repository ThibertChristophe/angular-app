import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../models/housinglocation';
import { HousingService } from '../../services/housing/housing.service';
import { UserService } from '../../services/user/user.service';
import { BookingService } from '../../services/booking/booking.service';
import { ToastrService } from 'ngx-toastr';
import { Booking } from '../../models/booking';
import { BookingDTO } from '../../dto/bookingDTO';

// Details d'une housing-location
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.sass',
})
export class DetailsComponent {
  readonly baseUrl = 'https://angular.dev/assets/tutorials/common';
  // Notre router
  route: ActivatedRoute = inject(ActivatedRoute);
  // Notre service / API
  housingService = inject(HousingService);
  userService = inject(UserService);
  bookingService = inject(BookingService);
  toastr: ToastrService = inject(ToastrService);
  // On prepare notre objet qui va recevoir le content de notre service et qu'on expose a la view
  housingLocation!: HousingLocation | undefined;
  alreadyBooked: boolean = false;

  constructor() {
    // en arrivant sur notre component on prend le parametre id et on l'utilise pour aller chercher la house correspondante
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
    // Verif si pas deja une reservation
    let dto: BookingDTO = {
      user_id: this.userService.userResult.id,
      home_id: Number(this.route.snapshot.params['id']),
    };
    this.bookingService.getBooking(dto).then((ok) => {
      this.alreadyBooked = ok;
    });
  }
  // Retire la reservation
  unbook() {}
  // Ajoute une ligne dans Booking
  apply() {
    /// Cree la resa
    let booking: Booking = {
      user: {
        id: this.userService.userResult.id,
      },
      home: {
        id: Number(this.route.snapshot.params['id']),
      },
    };
    this.bookingService.createBooking(booking).then((ok) => {
      if (ok) {
        this.toastr.success('Validé');
        this.alreadyBooked = true;
      } else {
        this.toastr.error('Reservation impossible');
      }
    });
  }
}
