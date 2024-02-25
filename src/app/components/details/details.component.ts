import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../models/housinglocation';
import { HousingService } from '../../services/housing/housing.service';

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
  // Notre route
  route: ActivatedRoute = inject(ActivatedRoute);
  // Notre service / API
  housingService = inject(HousingService);
  // On prepare notre objet qui va recevoir le content de notre service et qu'on expose a la view
  housingLocation!: HousingLocation | undefined;
  // FOrm qu'on va placer dans le [formGroup] de notre form et les champs dans des formControlName de nos input
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    // en arrivant sur notre component on prend le parametre id et on l'utilise pour aller chercher la house correspondante
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }
  // SUbmit du form a placer dans le (submit) du form
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
