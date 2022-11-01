import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'

Mapboxgl.accessToken = 'pk.eyJ1IjoiYXdpYWxsdWlzIiwiYSI6ImNsOXJlNTFqcjExdWEzb28wM2txNDN5amgifQ.W2N2GExzVRktPcT-leOPxw';

if(!navigator.geolocation) {
  alert("Geolocation is not supported by this browser.");
  throw new Error('Geolocation is not supported by this browser.');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
