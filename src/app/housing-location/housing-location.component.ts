import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.sass',
})
export class HousingLocationComponent {
  // Parametre de mon component (@Input())
  @Input() housingLocation!: HousingLocation;
  // Test onclick
  onClick() {
    alert(this.housingLocation.id);
  }
}
