import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer: NodeJS.Timeout | undefined; // NodeJS.Timeout is a type alias for a number

  constructor(private servicio: ServiceService) { }

  onQueryChange(query: string) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.servicio.getPlacesByQuery(query);
    }, 350);
  }
  

}
