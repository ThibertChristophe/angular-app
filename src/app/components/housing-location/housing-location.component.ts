import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HousingLocation } from '../../models/housinglocation';

// Card HousingLocation
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.sass',
})
export class HousingLocationComponent {
  // Parametre de mon component (@Input())
  //@Input() housingLocation!: HousingLocation;
  housingLocation = input<HousingLocation>();
}
