import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import * as moment from 'moment';
import { NgxSpinnerService }  from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {

  bodegaFormgroup: FormGroup;
  bodegas: any[] = [];
  bodegasfilter: any[] = [];

  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService
  ) {
    this.bodegaFormgroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
    });
   }

   ngOnInit() {
    this.spinner.show();
    this.service.getData(this.service.BASE_URL_INVENTARIO, '/obtenerBodega').subscribe((response: any) => {
      this.bodegas = response;
      console.log('son las bodegas',this.bodegas);
      console.log(response);
      this.spinner.hide();
    });
  }

  limpiarFormulario(){
    this.bodegaFormgroup.reset();
  }

  guardarBodega(){
    this.spinner.show();
    try {
      const bodega: any = {
        nombre: this.bodegaFormgroup.get('nombre').value,
        direccion: this.bodegaFormgroup.get('direccion').value,
        //estado: this.bodegaFormgroup.get('estado').value? 'Activo' : 'Inactivo',
        estado: 'Activo',
        fechacreacion: moment().format('YYYY-MM-DD'),
        fechamodificacion: moment().format('YYYY-MM-DD'),
      }
      console.log(bodega);
      this.service.postData(this.service.BASE_URL_INVENTARIO, 'bodega/crear', bodega).subscribe((response: any) => {
          console.log(response);
          this.limpiarFormulario();
          Swal.fire({
            titleText: `Se ha almacenado la información con éxito.`,
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false
          });
          this.limpiarFormulario();
        });
    } catch (error) {
      console.log(error);
      this.spinner.hide();
      return Swal.fire({
        titleText: `Error al registrar datos, por favor intente en otro momento.`,
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false,
      });
      
    }
  }

  editarBodega(bodega: any){
    this.bodegaFormgroup.get('nombre').setValue(bodega.nombre);
    this.bodegaFormgroup.get('direccion').setValue(bodega.direccion);
    this.bodegaFormgroup.get('estado').setValue(bodega.estado === 'activo'? true : false);
  }
}
