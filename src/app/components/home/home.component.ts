import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../models/housinglocation';
import { HousingService } from '../../services/housing/housing.service';

// Recupere et affiche la liste des housing-location
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  // Liste pour la liste filtrée
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocation().then((housingLocationList) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  // Filtre / recherche sur les city
  filterResults(text: string): void {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
