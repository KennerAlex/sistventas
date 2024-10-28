import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private url = 'http://localhost:8000/api/productos';
  constructor(private http: HttpClient) {}
  ObtenerTodos() {
    return this.http.get<[ProductoModel]>(this.url);
  }
  Agregar(producto: ProductoModel) {
    return this.http.post(this.url, producto);
  }
  Actualizar(producto: any, idProducto: number) {
    return this.http.put(this.url + '/' + idProducto, producto);
  }
  Borrar(idProducto: number) {
    return this.http.delete(this.url + '/' + idProducto);
  }
}
