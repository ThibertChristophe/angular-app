import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../models/housinglocation';
import { HousingService } from '../../services/housing/housing.service';
import { ToastrService } from 'ngx-toastr';

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
  toastr: ToastrService = inject(ToastrService);
  // Liste pour la liste filtrée
  filteredLocationList: HousingLocation[] = [];
  error: string | null = null;

  constructor() {
    const list: HousingLocation[] = [];
    list.push({
      id: 1,
      name: 'Loc1',
      city: 'city',
      state: 'state',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    });
    this.housingService
      .getAllHousingLocation()
      .then((housingLocationList) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue lors du chargement des données';
        console.error("Détails de l'erreur:", error);
      });
    this.housingLocationList = list;
    this.filteredLocationList = list;
  }

  // Filtre / recherche sur les city
  filterResults(text: string): void {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
