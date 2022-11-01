import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public useLocation: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }
  

  BASE_URL_INVENTARIO = environment.BASE_URL_INVENTARIO;

  constructor(
    private http: HttpClient
  ) {
    this.getUserLocation();
  }

  public getData<T>(pUrl: string, pNombreServicio: string | null, pParametro: string | null = null, pJSON: boolean = false): Observable<T> {
    if (pNombreServicio == null) {
      if (pParametro === null) {
        return this.http.get<T>(`${pUrl}`, this.generateHeaders(pJSON));
      } else {
        return this.http.get<T>(`${pUrl}/${pParametro}`, this.generateHeaders(pJSON));
      }
    } else {
      if (pParametro === null) {
        return this.http.get<T>(`${pUrl}/${pNombreServicio}`, this.generateHeaders(pJSON));
      } else {
        return this.http.get<T>(`${pUrl}/${pNombreServicio}/${pParametro}`, this.generateHeaders(pJSON));
      }
    }
  }

  public generateHeaders(json: boolean = false): object {
    let headers: HttpHeaders;
    if (json) {
      headers = new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json'
      });
    } else {
      headers = new HttpHeaders({
        'Accept': '*/*'
      });
    }
    //console.log('header a enviar:', JSON.stringify(headers));
    let httpOptions: object = { "headers": headers };
    return httpOptions;
  }


  public postData(pUrl: string, pNombreServicio: string | null, pBody: Object, pJSON: boolean = true): Observable<any> {
    if (pNombreServicio === null) {
      return this.http.post(pUrl, pBody, this.generateHeaders(pJSON));
    } else {
      return this.http.post(`${pUrl}/${pNombreServicio}`, pBody, this.generateHeaders(pJSON));
    }
  }

  public putData<T>(pUrl: string, pParametro: string, pBody: T): Observable<any> {
    let body = null;
    if (pBody)
      body = JSON.stringify(pBody);

    if (pParametro === null) {
      return this.http.put(`${pUrl}`, body, this.generateHeaders(true));
    }
    else {
      return this.http.put(`${pUrl}/${pParametro}`, body, this.generateHeaders(true));
    }
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.useLocation = [position.coords.longitude, position.coords.latitude];
          resolve(this.useLocation);
        },
        (error) => {
          reject(error);
          console.log('error', error);
        }
      );
    });
  }

  getPlacesByQuery(query: string) {
    this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?country=gt&limit=7&proximity=-90.47551232433844%2C14.576682090182572&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiYXdpYWxsdWlzIiwiYSI6ImNsOXJlNTFqcjExdWEzb28wM2txNDN5amgifQ.W2N2GExzVRktPcT-leOPxw`)
      .subscribe(console.log); // <--- this is the important line
  }

}
