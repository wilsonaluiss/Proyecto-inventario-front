import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Nombre: string;
    Password: string;
    hide = true;

  constructor(
    private route: Router, 
    private http: HttpClient
  ) { }

  login() {
    console.log(this.Nombre);
    console.log(this.Password);
    let rol = "";
   //consumo api
    this.http.post("http://localhost:8080/usuarios/login",{
      usuario: this.Nombre,
      password: this.Password
    }).subscribe((resp:any)=>{
        if(resp==null){

          console.log("error no existe usuario o contraseña")
        }
        else{
           rol=resp.id_Rol
          localStorage.setItem('rol', rol);//memoria local navegador
           this.route.navigate(['/home']);
        }
    });
    
    
  

}

  ngOnInit(): void {
  }

}
