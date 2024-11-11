import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoVentaModel } from '../models/pedidoVenta.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoVentaService {
  private url = 'http://localhost:8000/api/pedidoventa';

  constructor(private http: HttpClient) {}
  ObtenerTodos() {
    return this.http.get<[any]>(this.url);
  }
  Agregar(pedido:any) {
    console.log(pedido);
    return this.http.post(this.url, pedido);
  }
}
