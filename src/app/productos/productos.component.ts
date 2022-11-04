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
  productos: any[] = [];
  idProducto: any;
  id: any;

  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService
  ) { 
    this.productoFormgroup = new FormGroup({
      idProducto: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.obtenerProductos();
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
          this.obtenerProductos();
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

  obtenerProductos(){
    this.spinner.show();
    this.service.getData(this.service.BASE_URL_INVENTARIO, '/obtenerProductos').subscribe((response: any) => {
      this.productos = response;
      console.log('pinche id',this.id)
      console.log(response);
      this.spinner.hide();
    });
  }

  editarProducto(producto: any){
    console.log('id producto', this.id);
    this.id = producto.idProducto;
    this.productoFormgroup.get('nombre').setValue(producto.nombre);
    this.productoFormgroup.get('descripcion').setValue(producto.descripcion);
    this.productoFormgroup.get('precio').setValue(producto.precio);
    this.productoFormgroup.get('estado').setValue(producto.estado === 'Activo'? true : false);
    console.log('estado',producto.estado)
  }

  actualizarProducto(){
    this.spinner.show();
    try {
      const producto: any = {
        nombre: this.productoFormgroup.get('nombre').value,
        descripcion: this.productoFormgroup.get('descripcion').value,
        precio: this.productoFormgroup.get('precio').value,
        estado: this.productoFormgroup.get('estado').value? 'Activo' : 'Inactivo',
        fechamodificacion: moment().format('YYYY-MM-DD'),
      }
      console.log(producto);
      this.service.putData(this.service.BASE_URL_INVENTARIO, `producto/modificarProducto/${this.id}`, producto).subscribe((response: any) => {
          console.log(response);
          this.obtenerProductos();
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
