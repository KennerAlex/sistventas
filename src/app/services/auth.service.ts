import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Usuario {
  email: string;
  direccion:string
 }
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8000/api/login';
  constructor(private http: HttpClient) {}
  public verificarEmail(email: string) {
    return this.http.get<any>(this.url + `/` + email);
  }
  public verificarClave(email: string, clave: string) {
    return this.http.get<any>(this.url + `/` + email + `/` + clave);
  }
  Agregar(usuario:Usuario){
    return this.http.post(this.url,usuario);
    }

}
