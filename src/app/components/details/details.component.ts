import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../models/housinglocation';
import { HousingService } from '../../services/housing/housing.service';
import { UserService } from '../../services/user/user.service';
import { BookingService } from '../../services/booking/booking.service';
import { Booking } from '../../dto/booking';
import { ToastrService } from 'ngx-toastr';

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

  constructor() {
    // en arrivant sur notre component on prend le parametre id et on l'utilise pour aller chercher la house correspondante
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }
  onClick() {
    let dto: Booking = {
      user: {
        id: this.userService.userResult.id,
      },
      home: {
        id: Number(this.route.snapshot.params['id']),
      },
    };
    this.bookingService.createBooking(dto).then((ok) => {
      if (ok) {
        this.toastr.success('Validé');
      } else {
        this.toastr.error('Reservation impossible');
      }
    });
  }
}
