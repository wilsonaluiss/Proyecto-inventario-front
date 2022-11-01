import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { IconsComponent } from 'src/app/icons/icons.component';
import { BodegaComponent } from 'src/app/bodega/bodega.component';
import { InventarioComponent } from 'src/app/inventario/inventario.component';
import { MovimientoProductoComponent } from 'src/app/movimiento-producto/movimiento-producto.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { TrasladoBodegaComponent } from 'src/app/traslado-bodega/traslado-bodega.component';
import { LoadingComponent } from 'src/app/traslado-bodega/components/loading/loading.component';
import { MapViewComponent } from 'src/app/traslado-bodega/components/map-view/map-view.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    IconsComponent,
    BodegaComponent,
    InventarioComponent,
    MovimientoProductoComponent,
    TrasladoBodegaComponent,
    LoadingComponent,
    MapViewComponent

  ]
})

export class AdminLayoutModule {}

