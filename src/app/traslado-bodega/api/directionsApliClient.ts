import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root' // <-- add this line
})
export class DirectionsApliClient extends HttpClient {
    public baseUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving'; // <-- add this line

    constructor(handler: HttpHandler) {
        super(handler);
    }
    public override get<T>(url: string, ){
        url = this.baseUrl + url; // <-- add this line
        return super.get<T>(url, {
            params: {
                alternatives: false,
                geometries: 'geojson', // <-- add this line
                language: 'es', // <-- add this line
                overview: 'simplified',
                steps: true, // <-- add this line
                acces_token: environment.apiKey
        } // <-- add this line
    } // <-- add this line

}