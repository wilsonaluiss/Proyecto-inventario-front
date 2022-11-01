import { Component, OnInit,Input  } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const routesADMIN : RouteInfo[] = [
  { path: '/home/bodega', title: 'Bodega',  icon:'unarchive', class: '' },
  { path: '/home/inventario', title: 'Inventario',  icon:'view_list', class: '' },
  { path: '/home/movimientoProducto', title: 'MovimientoProducto',  icon:'view_in_ar', class: '' },
  { path: '/home/trasladoBodega', title: 'TrasladoBodega',  icon:'multiple_stop', class: '' },

];

export const routesBODEGA : RouteInfo[] = [
  { path: '/home/bodega', title: 'Bodega',  icon:'unarchive', class: '' },
  { path: '/home/trasladoBodega', title: 'TrasladoBodega',  icon:'multiple_stop', class: '' },

];


export const routesVENTAS : RouteInfo[] = [
  { path: '/home/inventario', title: 'Inventario',  icon:'view_list', class: '' },

];

export const ROUTES: RouteInfo[] = [
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() rol: string;
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    console.log(this.rol);
    if (this.rol == "1") {
      this.menuItems = routesADMIN.filter(menuItem => menuItem);
    } else if (this.rol == "2") {
      this.menuItems = routesBODEGA.filter(menuItem => menuItem);
    } else {
      this.menuItems = routesVENTAS.filter(menuItem => menuItem);

    }
  }
  
  /* isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }; */
}

