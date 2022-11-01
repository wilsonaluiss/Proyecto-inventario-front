import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(private service: ServiceService,) { }

  ngAfterViewInit(): void {

    if(!this.service.isUserLocationReady)throw Error('User location is not ready');
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.service.useLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

  }

}
