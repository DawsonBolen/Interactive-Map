import { Component, ViewEncapsulation } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { NgIf } from '@angular/common';


interface Country {
  name: string,
  capitalCity: string,
  region: string,
  incomeLevel: string,
  longitude: string,
  latitude: string,
  lendingType: string
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MapViewComponent {
  countryData: any;

  selectedCountry: string = '';

  selectCountryClick(event: Event) {

    let target = event.target as HTMLElement;
    let countryCode: string = target.id;
    this.selectedCountry = countryCode;
    console.log(countryCode);
    this.getData(countryCode);
  }

  constructor(private getdataService: GetdataService) { }

  getData(code: string) {
    this.getdataService.getCountryData(code).subscribe(data => {

      const country: Country = {
        name: data[1][0].name,
        capitalCity: data[1][0].capitalCity,
        region: data[1][0].region.value,
        incomeLevel: data[1][0].incomeLevel.value,
        longitude: data[1][0].longitude,
        latitude: data[1][0].latitude,
        lendingType: data[1][0].lendingType.value

      }
      this.countryData = country;
      console.log(country);
    });
  }



}
