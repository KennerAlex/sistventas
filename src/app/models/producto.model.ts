import { CategoriaModel } from "./categoria.model";

export interface ProductoModel {
  idProducto?: number;
  idcategoria: number;
  descripcion: string;
  precio:number;
  cantidad:number;
  foto: any;
  categoria: CategoriaModel;
  }
