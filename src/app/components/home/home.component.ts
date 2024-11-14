import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../models/housinglocation';
import { HousingService } from '../../services/housing/housing.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

// Recupere et affiche la liste des housing-location
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  toastr: ToastrService = inject(ToastrService);
  // Liste pour la liste filtrée
  filteredLocationList: HousingLocation[] = [];
  error: string | null = null;
  textSearch: string = '';

  constructor() {
    const list: HousingLocation[] = [];
    list.push({
      id: 1,
      name: 'Loc1',
      city: 'Bruxelles',
      state: 'state',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    });
    list.push({
      id: 2,
      name: 'Loc12',
      city: 'Paris',
      state: 'state',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    });
    list.push({
      id: 2,
      name: 'Loc12',
      city: 'Berlin',
      state: 'state',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    });
    list.push({
      id: 2,
      name: 'Loc12',
      city: 'Madrid',
      state: 'state',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    });
    list.push({
      id: 2,
      name: 'Loc12',
      city: 'New York',
      state: 'state',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    });
    list.push({
      id: 2,
      name: 'Loc12',
      city: 'Washington',
      state: 'state',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    });
    list.push({
      id: 2,
      name: 'Loc12',
      city: 'Rome',
      state: 'state',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    });

    this.housingService.getAllHousingLocation().subscribe({
      next: (success) => {
        this.housingLocationList = success;
        this.filteredLocationList = success;
      },
      error: (error) => {
        this.error = 'Une erreur est survenue lors du chargement des données';
        console.error("Détails de l'erreur:", error);
      },
    });
    this.housingLocationList = list;
    this.filteredLocationList = list;
  }

  // Filtre / recherche sur les city
  filterResults(): void {
    if (!this.textSearch) {
      this.filteredLocationList = this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city
          .toLowerCase()
          .includes(this.textSearch.toLowerCase())
    );
  }
}
