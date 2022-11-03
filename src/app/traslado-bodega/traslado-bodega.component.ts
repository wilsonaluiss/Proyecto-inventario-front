import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../services/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-traslado-bodega',
  templateUrl: './traslado-bodega.component.html',
  styleUrls: ['./traslado-bodega.component.css']
})
export class TrasladoBodegaComponent implements OnInit {
  selectBodegaSalida = '';
  selectBodegaIngreso = '';
  selectedProducto = "";
  exitenciaB1=0;
  exitenciaB2=0;
  cantidad=0;
  bodegas :any []=[];
  bodegaFilter : any []=[];
  productos :any []=[];
constructor(private http: HttpClient) { }

ngOnInit() {
   this.getProductos();
   this.getBodegas();
}

getProductos (){
  this.http.get("http://localhost:8080/producto/lstproductos").subscribe((resp:any)=>{
    if(resp==null){
          console.log("error no existe usuario o contraseña")
      }
        else{
          this.productos = resp;
        }
    });
}

getBodegas(){
  this.http.get("http://localhost:8080/inventario/bodegas").subscribe((resp:any)=>{
    if(resp==null){
          console.log("error no existe usuario o contraseña")
      }
        else{
          this.bodegas = resp;
        }
    });
}

selectProducto(producto:any){
  this.selectedProducto = producto.id_Producto;
  this.bodegaFilter= this.bodegas.filter(t=>t.id_Producto ==producto.id_Producto);
}

selectBodega(bodega:any, option:number){
  if(option==1){
    this.exitenciaB1 =  bodega.existencias;
    this.selectBodegaSalida = bodega.id_Bodega;
  }else{
    this.exitenciaB2 =  bodega.existencias;
    this.selectBodegaIngreso = bodega.id_Bodega;
  }
}

realizarTraslado(){
  let objtraslado = {
    "IdBodegaOrigen":this.selectBodegaSalida,
    "IdBodegaDestino":this.selectBodegaIngreso,
    "IdProducto":this.selectedProducto,
    "Cantidad":this.cantidad
  }
  console.log(objtraslado)
  this.http.post("http://localhost:8080/inventario/traslado",objtraslado).subscribe((resp:any)=>{
    if(!resp){
          console.log("error no se realizo el traslado")
      }
        else{
          console.log(resp)
          console.log("Se realizo el traslado")
        }
        this.limpiar();
    });
}

limpiar(){
  this.bodegaFilter=[];
  this.cantidad= 0;
  this.selectBodegaIngreso="";
  this.selectBodegaSalida="";
  this.exitenciaB1=0;
  this.exitenciaB2=0;
}

}


