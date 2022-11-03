import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-movimiento-producto',
  templateUrl: './movimiento-producto.component.html',
  styleUrls: ['./movimiento-producto.component.css']
})
export class MovimientoProductoComponent implements OnInit {


  Movimientos : any []=[];
  MovimientosFilter : any []=[];
  filtroProducto ="";
  filtroBodega = "";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:8080/inventario/movimientos").subscribe((resp:any)=>{
      if(resp==null){
            console.log("error en la lista de movimientos")
        }
          else{
            this.Movimientos = resp;
            this.MovimientosFilter = this.Movimientos;
          }
      });
  }

  applyFilter(event: Event) {
    
  }
  filtrar(){
    if(this.filtroProducto!=""){
       this.MovimientosFilter = this.Movimientos.filter(t=>t.nombreProducto.includes(this.filtroProducto));
    }else if(this.filtroBodega!=""){
      this.MovimientosFilter = this.Movimientos.filter(t=>t.bodega.includes(this.filtroBodega));
    }else{
     this.MovimientosFilter = this.Movimientos;
    }
 }



}
