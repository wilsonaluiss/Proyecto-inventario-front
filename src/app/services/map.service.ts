import { Injectable } from '@angular/core';
import { LngLatLike,Map } from 'mapbox-gl'; // <-- add this import

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map; // Map is a type alias for a number


  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if(!this.isMapReady)throw Error('Map is not ready'); // <-- add this line
    this.map.flyTo({center: coords, zoom: 15}); // <-- add this line
  }
  constructor() { }
}
