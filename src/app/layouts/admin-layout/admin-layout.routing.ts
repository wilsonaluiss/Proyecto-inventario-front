import { Routes } from "@angular/router";
import { BodegaComponent } from "src/app/bodega/bodega.component";
import { DashboardComponent } from "src/app/dashboard/dashboard.component";
import { IconsComponent } from "src/app/icons/icons.component";
import { InventarioComponent } from "src/app/inventario/inventario.component";
import { MovimientoProductoComponent } from "src/app/movimiento-producto/movimiento-producto.component";
import { TrasladoBodegaComponent } from "src/app/traslado-bodega/traslado-bodega.component";

export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'bodega',         component: BodegaComponent },
    { path: 'inventario',     component: InventarioComponent },
  
    { path: 'movimientoProducto',      component: MovimientoProductoComponent },
    { path: 'trasladoBodega',          component: TrasladoBodegaComponent},
    
];