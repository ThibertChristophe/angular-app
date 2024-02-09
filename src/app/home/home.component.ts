import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

// Home Page
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
    this.housingLocationList = this.housingService.getAllHousingLocation();
    this.filteredLocationList = this.housingLocationList;
  }

  // Filtre / recherche sur les city
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
