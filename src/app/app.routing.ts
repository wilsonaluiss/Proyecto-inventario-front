import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

const routes: Routes =[
 
    { path: 'login',component: LoginComponent },
    {
      path: 'home',
      component: AdminLayoutComponent,
      children: [{
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }]
    }, 
    {path: '', redirectTo: '/login', pathMatch: 'full'}
  ];
  
  @NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule.forRoot(routes)
    ],
    exports: [
    ],
  })
  export class AppRoutingModule { }