import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-traslado-bodega',
  templateUrl: './traslado-bodega.component.html',
  styleUrls: ['./traslado-bodega.component.css']
})
export class TrasladoBodegaComponent implements OnInit {

  selectBodegaSalida = 'B2';
  selectBodegaIngreso = 'B1';

  trasladoFormgroup: FormGroup;
  listarNombreBodega: any[] = [];

  obtenerBodegas: any = [];

  origen: any;
  adonde: any;
  constructor(
    private spinner: NgxSpinnerService,
    private service: ServiceService,
  ) {
    this.trasladoFormgroup = new FormGroup({
      bodegaSalida: new FormControl('', [Validators.required]),
      bodegaIngreso: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit() {
    this.obtenerCatalogoBodegas();
  }
  initMap(): void {
  }
  get isUserLocationReady(){
    return this.service.isUserLocationReady;
  }

  obtenerCatalogoBodegas() {
    this.spinner.show();
    this.service.getData<any>(this.service.BASE_URL_INVENTARIO, `obtenerBodega`).subscribe(data => {
      console.log('data', data);
      this.obtenerBodegas = data;
      this.spinner.hide();

    });
  }

  enviar() {
    console.log('salida', this.trasladoFormgroup.value);
    console.log('ingreso', this.trasladoFormgroup.value);

    this.origen = this.trasladoFormgroup.value.bodegaSalida;
    this.adonde = this.trasladoFormgroup.value.bodegaIngreso;

    console.log('origen', this.origen);
    console.log('adonde', this.adonde);
  }

}
