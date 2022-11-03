import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../services/service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
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
constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

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
  console.log(bodega);
  if(option==1){
    this.exitenciaB1 =  bodega.existencias;
  //  this.selectBodegaSalida = bodega.id_Bodega;
  }else{
    this.exitenciaB2 =  bodega.existencias;
   // this.selectBodegaIngreso = bodega.id_Bodega;
  }
}
doSomething(e, option:number){
  let bodega=this.bodegaFilter.filter(b=>b.id_Bodega==e.value)[0];
  if(option==1){
    this.exitenciaB1 =  bodega.existencias;
  //  this.selectBodegaSalida = bodega.id_Bodega;
  }else{
    this.exitenciaB2 =  bodega.existencias;
   // this.selectBodegaIngreso = bodega.id_Bodega;
  }

}

realizarTraslado(){
if(this.cantidad<=0){
  return Swal.fire({
    titleText: `cantidad incorrecta `,
    icon: 'error',
    showCloseButton: true,
    showConfirmButton: false
  });
  
}else if(this.cantidad > this.exitenciaB1){
  return Swal.fire({
    titleText: `error se excede a la cantidad de la existencia `,
    icon: 'error',
    showCloseButton: true,
    showConfirmButton: false
  });
 }else if(this.selectBodegaIngreso==this.selectBodegaSalida){
  return Swal.fire({
    titleText: `error no se puede  realizar traslado en la misma bodega `,
    icon: 'error',
    showCloseButton: true,
    showConfirmButton: false
  });

 }
  
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
          return Swal.fire({
            titleText: `error no se realizo el traslado`,
            icon: 'error',
            showCloseButton: true,
            showConfirmButton: false
          });
      }
        else{
          Swal.fire({
            titleText: `Se realizo el traslado.`,
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false
          });
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
  this.getProductos();
  this.getBodegas();

}

}


