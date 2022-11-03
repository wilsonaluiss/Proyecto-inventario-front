import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventario : any []=[];
  invetarioFilter : any []=[];
  filtroProducto ="";
  filtroBodega = "";
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get("http://localhost:8080/inventario/list").subscribe((resp:any)=>{
    if(resp==null){
          console.log("error no existe usuario o contraseña")
      }
        else{
          this.inventario = resp;
          this.invetarioFilter = this.inventario;
        }
    });
  }

  filtrar(){
     if(this.filtroProducto!=""){
        this.invetarioFilter = this.inventario.filter(t=>t.nombreProducto.includes(this.filtroProducto));
     }else if(this.filtroBodega!=""){
       this.invetarioFilter = this.inventario.filter(t=>t.bodega.includes(this.filtroBodega));
     }else{
      this.invetarioFilter = this.inventario;
     }
  }

}
