import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaModel } from '../models/categoria.model';

export interface Categoria {
  idCategoriaProducto: number;
  descripcion : string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private url = 'http://localhost:8000/api/categoria';
  constructor(private http: HttpClient) {}
  ObtenerTodos() {
    return this.http.get<[CategoriaModel]>(this.url);
  }

  Agregar(categoria: CategoriaModel) {
    return this.http.post(this.url, categoria);
  }
  Actualizar(categoria: any, idCategoriaProducto: number) {
    return this.http.put(this.url + '/' + idCategoriaProducto, categoria);
  }
  Borrar(idCategoriaProducto: number) {
    return this.http.delete(this.url + '/' + idCategoriaProducto);
  }
}
