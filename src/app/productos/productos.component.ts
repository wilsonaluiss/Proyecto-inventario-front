import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productoFormgroup: FormGroup;

  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService
  ) { 
    this.productoFormgroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  limpiarFormulario(){
    this.productoFormgroup.reset();
  }

  guardarProducto(){
    this.spinner.show();
    try {
      const producto: any = {
        nombre: this.productoFormgroup.get('nombre').value,
        descripcion: this.productoFormgroup.get('descripcion').value,
        precio: this.productoFormgroup.get('precio').value,
        estado: this.productoFormgroup.get('estado').value? 'Activo' : 'Inactivo',
        fechacreacion: moment().format('YYYY-MM-DD'),
        fechamodificacion: moment().format('YYYY-MM-DD'),
      }
      console.log(producto);
      this.service.postData(this.service.BASE_URL_INVENTARIO, 'crearProducto', producto).subscribe((response: any) => {
          console.log(response);
          this.limpiarFormulario();
          Swal.fire({
            titleText: `Se ha almacenado la información con éxito.`,
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false
          });
          this.spinner.hide();
        });
    } catch (error) {
      console.log(error);
      this.spinner.hide();
      return Swal.fire({
        titleText: `Error al registrar datos, por favor intente en otro momento.`,
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false
      });
      
    }
  }

}
